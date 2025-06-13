import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-address-fill',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    FormsModule
  ],
  templateUrl: './address-fill.component.html',
  styleUrl: './address-fill.component.scss'
})
export class AddressFillComponent {

}
