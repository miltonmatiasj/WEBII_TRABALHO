import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceRequestService } from './services/maintenance-request-details.service';
import { MaintenanceRequestBudgetModalComponent } from './components/maintenance-request-budget-modal/maintenance-request-budget-modal.component';
import { ConfirmationBudgetDialogComponent } from './components/maintenance-request-budget-modal/confirmation-budget-dialog.component';
import { PaymentComponent } from './components/payment/payment.component';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.request = this.maintenanceService.getRequestById(id);
      this.history = this.maintenanceService.getMockHistory();
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
      case 'APROVADA':
        return null;
      default:
        return null;
    }
  }

  onActionClick(): void {
    const action = this.getActionButton();
    if (this.request?.status === 'ORCADA') {
      this.dialog
        .open(MaintenanceRequestBudgetModalComponent, {
          width: '600px',
          data: {
            id: this.request.id,
            equipment: this.request.equipmentDescription,
            description: this.request.defectDescription,
            date: this.request.requestDate,
            telephone: this.request.telephone || 'Não informado',
            owner: this.request.owner || 'Não informado',
            tecAval: this.request.tecAval || 'Avaliação técnica não disponível',
            price: this.request.price || 0,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result?.action === 'accept') {
            this.maintenanceService.updateRequestStatus(
              this.request.id,
              'APROVADA'
            );
            this.request = this.maintenanceService.getRequestById(
              this.request.id
            );
            alert('Manutenção aprovada!');
          } else if (result?.action === 'refuse') {
            this.maintenanceService.updateRequestStatus(
              this.request.id,
              'REJEITADA'
            );
            this.request = this.maintenanceService.getRequestById(
              this.request.id
            );
            alert('Manutenção recusada!');
          }
        });
    } else if (this.request?.status === 'ARRUMADA') {
      this.dialog
        .open(PaymentComponent, {
          width: '500px',
          data: {
            id: this.request.id,
            totalValue: this.request.price || 0,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result?.confirmed) {
            this.maintenanceService.updateRequestStatus(
              this.request.id,
              'PAGA'
            );
            this.request = this.maintenanceService.getRequestById(
              this.request.id
            );
            alert('Pagamento realizado com sucesso!');
          } else {
            alert('Pagamento cancelado.');
          }
        });
    } else {
      alert(`Ação: ${action}`);
    }
  }
}
