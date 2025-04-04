import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
<<<<<<< HEAD
import { CategoryComponent } from './category/category.component';
import { MaintenanceRequestDetailsComponent } from './maintenance-request-details/maintenance-request-details.component';
=======
import { PaymentComponent } from './payment/payment.component';
>>>>>>> 8024240 (feat(RF010) : created the payment component and added in the routes path's.)

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
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'maintenance-request-details/:id',
    component: MaintenanceRequestDetailsComponent,
  },
  {
    path: 'payment',
    //component: PaymentComponent,
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)
  },
];
