import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { LoginComponent } from './authentication/login/login.component';
import {authGuard} from "./authentication/auth.guard";

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
    canActivate: [authGuard],
  },
];
