import { Component, Inject, inject } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../users/User';
import { NgxMaskDirective } from 'ngx-mask';
import { Employee } from '../Employee';

@Component({
  selector: 'app-new-employee',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatButton,
    NgxMaskDirective,
    FormsModule,
  ],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewEmployeeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee | null) {
    if (data) {
      this.formGroup.get('name')?.setValue(data.name);
      this.formGroup.get('email')?.setValue(data.email);
      this.formGroup.get('cpf')?.setValue(data.cpf);
      this.formGroup.get('phone')?.setValue(data.phone);
    }
  }
  dialog = inject(MatDialogRef);
  password: string = '';
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11),]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
  });

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const user = User.empty();
    user.name = this.formGroup.get('name')?.value ?? '';
    user.email = this.formGroup.get('email')?.value ?? '';
    user.cpf = this.formGroup.get('cpf')?.value ?? '';
    user.phone = this.formGroup.get('phone')?.value ?? '';
    if (!this.data) {
      if (!this.password || this.password.length < 2) {
        console.log('here')
        return;
      }
      user.setPassword(this.password);
    }
    this.dialog.close(user);
  }

  cancel() {
    this.dialog.close();
  }
}
