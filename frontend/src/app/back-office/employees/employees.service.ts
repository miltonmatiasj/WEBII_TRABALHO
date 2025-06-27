import {inject, Injectable, signal} from '@angular/core';
import {Employee} from "./Employee";
import {MatDialog} from "@angular/material/dialog";
import {NewEmployeeComponent} from "./new-employee/new-employee.component";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  allEmployees = signal<Employee[]>([])
  filteredEmployees = signal<Employee[]>([])
  http = inject(HttpClient)

  constructor() {
    this.requestAllEmployees();
  }

  async requestAllEmployees() {
    const response = await lastValueFrom(this.http.get<Employee[]>(`${environment.baseUrl}/employees`))
    this.allEmployees.set([...response])
    this.filteredEmployees.set([...response]);
  }

  async newEmployee(employee: Employee) {
    const employees = this.allEmployees();
    employees.push(employee)
    this.allEmployees.set([...employees])
    this.filteredEmployees.set([...employees])
    await lastValueFrom(this.http.post<Employee[]>(`${environment.baseUrl}/users`, employee.toJson()));
  }

  async deleteEmployee(employee: Employee) {
    const employees = this.allEmployees();
    const index = employees.findIndex(emp => emp.cpf === employee.cpf);
    if (index !== -1) {
      employees.splice(index, 1);
      this.allEmployees.set([...employees])
      this.filteredEmployees.set([...employees])
      await lastValueFrom(this.http.delete<void>(`${environment.baseUrl}/users/${employee.id}`));
    }
  }

  async updateEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '400px',
      data: employee
    });
    const result = await lastValueFrom(dialogRef.afterClosed());
    if (result) {
      await lastValueFrom(this.http.put<Employee>(`${environment.baseUrl}/users/${employee.id}`, result.toJson()));
      await this.requestAllEmployees();
    }
  }

  dialog = inject(MatDialog)
  openNewEmployeeDialog() {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.newEmployee(result);
      }
    });
  }
}
