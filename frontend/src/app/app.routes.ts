import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'customer-home',
    component: CustomerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tests',
    component: TestComponentComponent,
    canActivate: [AuthGuard],
  },
];
