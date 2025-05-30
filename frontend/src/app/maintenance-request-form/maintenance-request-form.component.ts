import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import {
  CreateCustomerData,
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
  categories: { id: string; categoryName: string; isActivated: boolean }[] = [];

  constructor(
    private maintenanceRequestFormService: MaintenanceRequestFormService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maintenanceRequestFormService.getCategories().subscribe((data) => {
      this.categories = data ?? [];
    });
  }

  onSubmit(form: NgForm): void {
    const newRequest: CreateCustomerData = {
      equipmentDescription: form.value.equipmentDescription,
      category: form.value.category,
      defectDescription: form.value.defectDescription,
      status: 'ABERTA',
      customer: '32323232323232323232323232323232',
    };

    this.maintenanceRequestFormService
      .createMaintenanceRequest(newRequest)
      .subscribe();
    alert('Solicitação adicionada com sucesso!');
    // form.reset();
    // this.router.navigate(['/customer-home']);
  }
}
