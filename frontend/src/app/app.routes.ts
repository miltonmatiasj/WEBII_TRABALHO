import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { CategoryComponent } from './category/category.component';

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
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'tests',
    component: TestComponentComponent,
    canActivate: [AuthGuard],
  },
];
