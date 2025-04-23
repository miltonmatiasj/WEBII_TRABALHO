import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { CategoryComponent } from './category/category.component';
import { MaintenanceRequestDetailsComponent } from './maintenance-request-details/maintenance-request-details.component';
import { MaintenanceRequestForm } from './maintenance-request-form/maintenance-request-form.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ServiceQuoteComponent } from './service-quote/service-quote.component';
import { RequestListComponent } from './request-list/request-list.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { ServiceMaintenanceComponent } from './back-office/service-maintenance/service-maintenance.component';
import { CustomerTemplateComponent } from './layouts/customer-template/customer-template.component';
import { MockAuthGuard } from './authentication/auth.guard';
import { AdminGuard } from './authentication/admin.guard';
import { RedirectService } from './authentication/redirect.service';

export const routes: Routes = [
  //Rota padrão com redirecionamento
  {
    path: '',
    canActivate: [MockAuthGuard],
    resolve: {
      redirect: (redirectService: RedirectService) => {
        redirectService.redirectBasedOnRole();
        return null;
      }
    },
    children: []
  },
  //Open Routes
  {
    path: '',
    component: CustomerTemplateComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]
  },
  //Client Routes
  {
    path: '',
    component: CustomerTemplateComponent,
    canActivate: [MockAuthGuard],
    children: [
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
    ]
  },
  //Admin Routes
  {
    path: 'back-office',
    component: AdminLayoutComponent,
    canActivate: [MockAuthGuard, AdminGuard],
    children: [
      {
        path: 'home',
        component: EmployeePageComponent,
      },
      {
        path: 'maintenance-request',
        component: RequestListComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'service-quote/:id',
        component: ServiceQuoteComponent,
      },
    ]
  },
  {
    path: 'back-office/service-quote/:id',
    component: ServiceQuoteComponent,
    canActivate: [MockAuthGuard, AdminGuard]
  },
  {
    path: 'back-office/service-maintenance/:id',
    component: ServiceMaintenanceComponent,
    canActivate: [MockAuthGuard, AdminGuard]
  }
];
