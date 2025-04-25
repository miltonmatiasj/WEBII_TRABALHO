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
  request: any;
  history: any[] = [];
  displayedColumns: string[] = ['dateTime', 'employee', 'action'];

  private dialog = inject(MatDialog);

  constructor(
    private maintenanceService: MaintenanceRequestService,
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
      this.request = this.maintenanceService.getRequestById(id);
      console.log(this.request);
      if (!this.request || this.request.userId !== currentUser.id) {
        this.router.navigate(['/customer-home']);
        return;
      }
      this.history = this.maintenanceService.getMockHistory();
    }
  }

  getActionButton(): string | null {
    console.log(1, this.request.status);
    switch (this.request?.status) {
      case 'ORCADA':
        return 'Aprovar/Rejeitar Serviço';
      case 'REJEITADA':
        return 'Resgatar Serviço';
      case 'ARRUMADA':
        return 'Pagar Serviço';
      case 'REDIRECIONADA':
      case 'PAGA':
        return 'Finalizar Serviço';
      case 'APROVADA':
        return null;
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
    const dialogRef = this.dialog.open(MaintenanceRequestBudgetModalComponent, {
      width: '600px',
      data: {
        id: this.request.id,
        equipment: this.request.equipmentDescription,
        description: this.request.defectDescription,
        date: this.request.requestDate,
        price: this.request.price || 0,
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result?.action === 'accept') {
      this.maintenanceService.updateRequestStatus(this.request.id, 'APROVADA');
      this.request = this.maintenanceService.getRequestById(this.request.id);
      alert('Manutenção aprovada!');
    } else if (result?.action === 'refuse') {
      this.maintenanceService.updateRequestStatus(this.request.id, 'REJEITADA');
      this.request = this.maintenanceService.getRequestById(this.request.id);
      alert('Manutenção recusada!');
    }
  }

  private async handlePaymentAction(): Promise<void> {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '500px',
      data: {
        id: this.request.id,
        totalValue: this.request.price || 0,
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result?.confirmed) {
      this.maintenanceService.updateRequestStatus(this.request.id, 'PAGA');
      this.request = this.maintenanceService.getRequestById(this.request.id);
      alert('Pagamento realizado com sucesso!');
    }
  }

  private async handleRescueAction(): Promise<void> {
    const confirmed = confirm('Deseja resgatar esta solicitação?');
    if (confirmed) {
      this.maintenanceService.updateRequestStatus(this.request.id, 'APROVADA');
      this.request = this.maintenanceService.getRequestById(this.request.id);
      alert('Solicitação aprovada com sucesso!');
    }
  }

  private async handleFinalizeAction(): Promise<void> {
    const confirmed = confirm('Deseja finalizar esta solicitação?');
    if (confirmed) {
      console.log('Iniciando finalização da solicitação:', this.request);
      this.maintenanceService.updateRequestStatus(this.request.id, 'FINALIZADA');

      // Aguardar um pequeno intervalo para garantir que o localStorage foi atualizado
      await new Promise(resolve => setTimeout(resolve, 100));

      // Buscar a solicitação atualizada
      const updatedRequest = this.maintenanceService.getRequestById(this.request.id);
      console.log('Solicitação atualizada:', updatedRequest);

      if (updatedRequest) {
        this.request = updatedRequest;
        console.log('Solicitação atualizada no componente:', this.request);
        alert('Solicitação finalizada com sucesso!');
      } else {
        console.error('Não foi possível atualizar a solicitação');
        alert('Erro ao finalizar a solicitação. Por favor, tente novamente.');
      }
    }
  }
}
