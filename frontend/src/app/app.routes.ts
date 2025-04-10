import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { LoginComponent } from './authentication/login/login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { MaintenanceRequestDetailsComponent } from './maintenance-request-details/maintenance-request-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer-home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'customer-home',
    component: CustomerHomeComponent,
  },
  {
    path: 'maintenance-request-details/:id',
    component: MaintenanceRequestDetailsComponent,
  },
];
