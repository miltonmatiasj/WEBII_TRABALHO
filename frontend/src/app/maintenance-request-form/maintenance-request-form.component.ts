import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../maintenance-request-details/services/maintenance-request-details.service';
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
import { AuthService } from '../authentication/auth.service';
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
    private authService: AuthService,
    private router: Router,
    private maintenanceRequestService: MaintenanceRequestService
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
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      alert('Usuário não está logado');
      return;
    }

    const newRequest: CustomerData = {
      id: this.generateRandomString(),
      userId: currentUser.id,
      equipmentDescription: form.value.descricao_equipamento,
      status: 'ABERTA',
      requestDate: new Date().toISOString().split('T')[0],
      equipmentCategory: form.value.categoria,
      defectDescription: form.value.descricao_defeito,
      history: [
        {
          dateTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
          employee: currentUser.name,
          action: 'Solicitação registrada'
        }
      ]
    };

    if (newRequest.equipmentDescription && newRequest.equipmentCategory && newRequest.defectDescription != null){
      this.maintenanceRequestFormService.addCustomerData(newRequest);
      alert('Solicitação adicionada com sucesso!');
      this.maintenanceRequestService.addHistoryStep(currentUser.id, {
        dateTime: new Date().toISOString(),
        employee: currentUser.name, 
        action: 'Solicitação aberta'
      });
      form.reset();
      this.router.navigate(['/customer-home']);
    }else{
      alert("Há campos vazios ainda!");
    }
  }
}
