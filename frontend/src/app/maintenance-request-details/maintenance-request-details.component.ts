import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestService } from './services/maintenance-request-details.service';

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

  constructor(private maintenanceService: MaintenanceRequestService) {}

  ngOnInit(): void {
    this.request = this.maintenanceService.getMockRequest('EM_ANDAMENTO');
    this.history = this.maintenanceService.getMockHistory();
  }

  getActionButton(): string | null {
    switch (this.request.status) {
      case 'ORÇADA':
        return 'Aprovar/Rejeitar Serviço';
      case 'REJEITADA':
        return 'Resgatar Serviço';
      case 'ARRUMADA':
        return 'Pagar Serviço';
      case 'APROVADA':
        return null;
      default:
        return 'Visualizar Serviço';
    }
  }

  onActionClick(): void {
    const action = this.getActionButton();
    alert(`Ação: ${action}`);
  }
}
