import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';           
import { MatSelectModule } from '@angular/material/select';         
import { MatButtonModule } from '@angular/material/button';    
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule, // <-- ESTE AQUI!
    MatButtonModule // se quiser usar os botões do Angular Material
  ],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent {}
