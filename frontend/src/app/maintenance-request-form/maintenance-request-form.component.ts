import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import {
  CustomerData,
  MaintenanceRequestFormService,
} from './mainetance-request-form.service';
import { CategoryService, Category } from '../category/category.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'maintenance-request-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './maintenance-request-form.component.html',
  styleUrls: ['./maintenance-request-form.component.scss'],
})
export class MaintenanceRequestForm implements OnInit {
  categories: Category[] = [];

  constructor(
    private maintenanceRequestFormService: MaintenanceRequestFormService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    console.log(this.categories);
  }

  generateRandomString(length: number = 30): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  onSubmit(form: NgForm): void {
    const newRequest: CustomerData = {
      id: this.generateRandomString(),
      equipmentDescription: form.value.descricao_equipamento,
      status: 'ABERTA',
      requestDate: new Date().toISOString().split('T')[0],
      equipmentCategory: form.value.categoria,
      defectDescription: form.value.descricao_defeito,
    };

    if (newRequest.equipmentDescription && newRequest.equipmentCategory && newRequest.defectDescription != null){
      this.maintenanceRequestFormService.addCustomerData(newRequest);
      alert('Solicitação adicionada com sucesso!');
      this.router.navigate(['/customer-home']);
      form.reset();
    }else {
      alert('Ainda há campos vazios!');
    }
  }
}
