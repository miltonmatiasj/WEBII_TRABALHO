import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { LoginComponent } from './app/authentication/login/login.component';
import { AuthGuard } from './authentication/auth.guard';

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
  },
];
