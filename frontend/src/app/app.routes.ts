import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { CategoryComponent } from './category/category.component';
import { MaintenanceRequestDetailsComponent } from './maintenance-request-details/maintenance-request-details.component';
import { MaintenanceRequestForm } from './maintenance-request-form/maintenance-request-form.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { RegisterComponent } from './authentication/register/register.component';

export const routes: Routes = [
  //Client Routes
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'customer-home',
    component: CustomerHomeComponent,
  },
  {
    path: 'maintenance-request/create',
    component: MaintenanceRequestForm,
  },
  {
    path: 'maintenance-request/:id',
    component: MaintenanceRequestDetailsComponent,
  },
  //Admin Routes
  {
    path: 'category',
    component: CategoryComponent,
  },
];
