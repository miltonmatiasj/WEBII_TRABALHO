import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {EmployeesService} from "../../../back-office/employees/employees.service";
import {AuthService} from "../../../authentication/auth.service";

@Component({
  selector: 'app-redirect-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './redirect-modal.component.html',
  styleUrls: ['./redirect-modal.component.scss']
})
export class RedirectModalComponent {
  selectedEmployeeId: string | null = null;
  erro: string = '';

  employeeService = inject(EmployeesService);
  authService = inject(AuthService);

  constructor(public dialogRef: MatDialogRef<RedirectModalComponent>) {}

  filterEmployees() {
    return this.employeeService.allEmployees().filter(employee => employee.id !== this.authService.currentUser()?.id);
  }

  redirecionar(): void {
    if (!this.selectedEmployeeId) {
      this.erro = 'Selecione um funcionário.';
      return;
    }

    const redirecionamento = {
      de: this.authService.currentUser()?.id,
      para: this.selectedEmployeeId,
      dataHora: new Date().toISOString()
    };

    this.dialogRef.close(redirecionamento);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
