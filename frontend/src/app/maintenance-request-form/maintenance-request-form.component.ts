import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MaintenanceRequestPOST,
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data ?? [];
    });

    console.log(this.categories);
  }

  async onSubmit(form: NgForm): Promise<void> {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      alert('Usuário não está logado');
      return;
    }

    const newRequest: MaintenanceRequestPOST = {
      equipmentDescription: form.value.descricao_equipamento,
      category: {
        id: form.value.categoria
      },
      customer: {
        id: currentUser.id
      },
      defectDescription: form.value.descricao_defeito,
    };

    await this.maintenanceRequestFormService.addCustomerData(newRequest);
    alert('Solicitação adicionada com sucesso!');
    form.reset();
    await this.router.navigate(['/customer-home']);
  }
}
