import {Component, inject} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton, MatIconButton} from "@angular/material/button";
import {EmployeesService} from "./employees.service";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../authentication/auth.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-employees',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatIcon,
    MatIconButton,
    MatTooltip,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  authService = inject(AuthService)
  employeeService = inject(EmployeesService)
  displayedColumns = ['name', 'cpf', 'phone', 'birthdate', 'action'];
}
