import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { RequestService } from '../employee-page/services/request.service';
import { FinalizeRequestModalComponent } from './compnents/finalize-request-modal/finalize-request-modal.component';
import {MaintenanceRequest} from "../maintenance-request-form/mainetance-request-form.service";

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  displayedColumns: string[] = [
    'client',
    'equipmentDescription',
    'categoryName',
    'status',
    'dateTime',
    'action'
  ];

  allRequests: MaintenanceRequest[] = [];
  filteredRequests: MaintenanceRequest[] = [];

  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  constructor(
    private requestService: RequestService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestService.getRequests().then((r) => {
      this.allRequests = r;
      this.aplicarFiltro();
      console.log(r);
    });
  }

  aplicarFiltro(): void {
    this.filteredRequests = [...this.allRequests]
      // .filter(req => {
      //   const dataReq = new Date(req.requestDate);
      //
      //   if (req.status === 'REDIRECIONADA' && req.customer.id !== this.funcionarioNome) return false;
      //
      //   if (this.dataInicio && dataReq < this.dataInicio) return false;
      //   if (this.dataFim && dataReq > this.dataFim) return false;
      //
      //   return true;
      // })
      // .sort((a, b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime());
  }

  filterToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.dataInicio = today;
    this.dataFim = tomorrow;
    this.aplicarFiltro();
  }

  limparFiltro(): void {
    this.dataInicio = null;
    this.dataFim = null;
    this.aplicarFiltro();
  }

  getColor(status: string): string {
    switch (status) {
      case 'ABERTA': return 'gray';
      case 'ORCADA': return 'brown';
      case 'REJEITADA': return 'red';
      case 'APROVADA': return 'gold';
      case 'REDIRECIONADA': return 'purple';
      case 'ARRUMADA': return 'blue';
      case 'PAGA': return 'orange';
      case 'FINALIZADA': return 'green';
      default: return 'black';
    }
  }

  getActionLabel(status: string): string | null {
    switch (status) {
      case 'ABERTA':
        return 'Efetuar Orçamento';
      case 'APROVADA':
      case 'REDIRECIONADA':
        return 'Efetuar Manutenção';
      case 'PAGA':
        return 'Finalizar Solicitação';
      default:
        return null;
    }
  }

  handleAction(status: string, id: string): void {
    if (status === 'PAGA') {
      this.openFinalizationModal(id);
    } else if (status === 'ABERTA') {
      this.router.navigate(['/back-office/service-quote', id]);
    }  else if (status === 'APROVADA' || status === 'REDIRECIONADA') {
      this.router.navigate([`/back-office/request/${id}/maintenance`]);
    }
  }

  openFinalizationModal(id: string): void {
    this.dialog.open(FinalizeRequestModalComponent, {
      width: '350px',
    }).afterClosed().subscribe(async (result) => {
      if (result) {
        const request = this.requestService.getRequestById(id);
        if (request) {
          request.status = 'FINALIZADA';
          this.requestService.updateRequest(request);
          this.allRequests = await this.requestService.getRequests();
          this.aplicarFiltro();
        } else {
          console.log('Nenhuma requisição encontrada com o ID:', result);
        }
      }
    })
  }
}
