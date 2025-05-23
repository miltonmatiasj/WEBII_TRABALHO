import {Component, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {provideNativeDateAdapter} from "@angular/material/core";
import {User} from "../../../users/User";

@Component({
  selector: 'app-new-employee',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    MatButton
  ],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewEmployeeComponent {
  dialog = inject(MatDialogRef)

   formGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    phone: new FormControl(''),
    birthdate: new FormControl('')
   })

  save() {
    const user = User.empty();
    user.name = this.formGroup.get('name')?.value ?? '';
    user.email = this.formGroup.get('email')?.value ?? '';
    user.cpf = this.formGroup.get('cpf')?.value ?? '';
    user.phone = this.formGroup.get('phone')?.value ?? '';
    this.dialog.close(user);
  }

  cancel() {
     this.dialog.close();
  }
}
