import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceRequestService } from './services/maintenance-request-details.service';
import { MaintenanceRequestBudgetModalComponent } from './components/maintenance-request-budget-modal/maintenance-request-budget-modal.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthService } from '../authentication/auth.service';
import { MaintenanceRequest } from '../maintenance-request-form/mainetance-request-form.service';
import { RequestService } from '../employee-page/services/request.service';
import {
  MaintenanceRequestBudget,
  ServiceQuoteService,
} from '../service-quote/services/service-quote.service';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-request-details',
  templateUrl: './maintenance-request-details.component.html',
  styleUrls: ['./maintenance-request-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
  ],
})
export class MaintenanceRequestDetailsComponent implements OnInit {
  request?: MaintenanceRequest;
  history: any[] = [];
  displayedColumns: string[] = ['dateTime', 'employee', 'action'];

  private dialog = inject(MatDialog);
  private serviceBudgetService = inject(ServiceQuoteService);

  constructor(
    private maintenanceService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.maintenanceService.getRequestById(id).then((r) => {
        this.request = r;
      });

      this.maintenanceService.getRequestHistoryById(id).then((h) => {
        this.history = h;
      });
    }
  }

  getActionButton(): string | null {
    switch (this.request?.status) {
      case 'ORCADA':
        return 'Aprovar/Rejeitar Serviço';
      case 'REJEITADA':
        return 'Resgatar Serviço';
      case 'ARRUMADA':
        return 'Pagar Serviço';
      default:
        return null;
    }
  }

  async onActionClick(): Promise<void> {
    if (!this.request) return;

    switch (this.request.status) {
      case 'ORCADA':
        await this.handleBudgetAction();
        break;
      case 'ARRUMADA':
        await this.handlePaymentAction();
        break;
      case 'REJEITADA':
        await this.handleRescueAction();
        break;
      case 'REDIRECIONADA':
      case 'PAGA':
        await this.handleFinalizeAction();
        break;
    }
  }

  private async handleBudgetAction(): Promise<void> {
    if (this.request == null) {
      return;
    }
    const dialogRef = this.dialog.open(MaintenanceRequestBudgetModalComponent, {
      width: '600px',
      data: this.request,
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result?.action === 'accept') {
      alert('Manutenção aprovada!');
      this.router.navigate(['/customer-home']);
    } else if (result?.action === 'refuse') {
      alert('Manutenção recusada!');
      this.router.navigate(['/customer-home']);
    }
  }

  http = inject(HttpClient);
  private async handlePaymentAction(): Promise<void> {
    if (this.request == null) {
      return;
    }
    const budget = await lastValueFrom(
      this.http.get<MaintenanceRequestBudget>(
        `${environment.baseUrl}/maintenance-requests/${this.request.id}/budget`
      )
    );
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '500px',
      data: {
        id: this.request.id,
        totalValue: budget.price || 0,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result?.confirmed) {
        await this.maintenanceService.changeStatus(
          this.request!.id,
          'PAGA',
          result.paymentMethod
        );
        alert('Pagamento realizado com sucesso!');
        this.router.navigate(['/customer-home']);
      }
    });
  }

  private async handleRescueAction(): Promise<void> {
    if (this.request == null) {
      return;
    }
    const confirmed = confirm('Deseja resgatar esta solicitação?');
    if (confirmed) {
      await this.maintenanceService.changeStatus(this.request.id, 'APROVADA');
      const updatedRequest = await this.maintenanceService.getRequestById(
        this.request.id
      );
      if (updatedRequest) {
        this.request = updatedRequest;
        alert('Solicitação resgatada com sucesso!');
        this.router.navigate(['/customer-home']);
      } else {
        alert('Erro ao resgatar a solicitação. Por favor, tente novamente.');
      }
    }
  }

  private async handleFinalizeAction(): Promise<void> {
    if (this.request == null) {
      return;
    }
    const confirmed = confirm('Deseja finalizar esta solicitação?');
    if (confirmed) {
      console.log('Iniciando finalização da solicitação:', this.request);
      await this.maintenanceService.changeStatus(this.request.id, 'FINALIZADA');
      const updatedRequest = await this.maintenanceService.getRequestById(
        this.request.id
      );
      if (updatedRequest) {
        this.request = updatedRequest;
        console.log('Solicitação atualizada no componente:', this.request);
        alert('Solicitação finalizada com sucesso!');
      } else {
        console.error('Não foi possível atualizar a solicitação');
        alert('Erro ao finalizar a solicitação. Por favor, tente novamente.');
      }
      await this.router.navigate(['/customer-home']);
    }
  }
}
