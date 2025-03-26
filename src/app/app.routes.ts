import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
];
