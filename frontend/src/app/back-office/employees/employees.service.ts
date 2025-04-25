import {inject, Injectable, signal} from '@angular/core';
import {Employee} from "./Employee";
import {AuthMockedService} from "../../authentication/auth-mocked.service";
import {MatDialog} from "@angular/material/dialog";
import {NewEmployeeComponent} from "./new-employee/new-employee.component";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  allEmployees = signal<Employee[]>([])
  filteredEmployees = signal<Employee[]>([])
  authMockedService = inject(AuthMockedService)
  constructor() {
    const employees = this.authMockedService.getUsers();
    this.allEmployees.set([...employees])
    this.filteredEmployees.set([...employees])
  }

  newEmployee(employee: Employee) {
    const employees = this.allEmployees();
    employees.push(employee)
    this.allEmployees.set([...employees])
    this.filteredEmployees.set([...employees])
  }

  deleteEmployee(employee: Employee) {
    const employees = this.allEmployees();
    const index = employees.findIndex(emp => emp.cpf === employee.cpf);
    if (index !== -1) {
      employees.splice(index, 1);
      this.allEmployees.set([...employees])
      this.filteredEmployees.set([...employees])
    }
  }

  dialog = inject(MatDialog)
  openNewEmployeeDialog() {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '400px',
      height: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newEmployee(result);
      }
    });
  }
}
