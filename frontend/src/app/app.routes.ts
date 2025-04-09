import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { ShowBudgetComponent } from './show-budget-component/show-budget.component';

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
    path: 'tests',
    component: TestComponentComponent,
    canActivate: [AuthGuard],
  }
];
