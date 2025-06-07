import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { RequestService } from '../employee-page/services/request.service';
import { Customer, ServiceQuoteService } from '../service-quote/services/service-quote.service';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceDescriptionModalComponent } from './components/maintenance-description-modal/maintenance-description-modal.component';
import { RedirectModalComponent } from './components/redirect-modal/redirect-modal.component';
import {MaintenanceRequest} from "../maintenance-request-form/mainetance-request-form.service";

@Component({
  selector: 'app-maintenance-screen',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './maintenance-screen.component.html',
  styleUrls: ['./maintenance-screen.component.scss']
})
export class MaintenanceScreenComponent implements OnInit {
  solicitacao!: MaintenanceRequest | undefined;
  descricaoManutencao = '';
  orientacoesCliente = '';
  funcionarioLogado = 'Funcionário Exemplo';
  cliente?: Customer;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private serviceServiceQuote: ServiceQuoteService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.requestService.getRequestById(id).then((response) => {
        this.solicitacao = response;
      })

    }
    this.cliente = this.serviceServiceQuote.getCustomerByCPF(this.solicitacao?.customer.cpf ?? '');
  }


  openDescriptionMaintenanceDialog(): void {
    const dialogRef = this.dialog.open(MaintenanceDescriptionModalComponent, {
      width: '700px',
      minWidth: '700px',
      maxWidth: '700px',
      height:'450px',
      data: { solicitacaoId: this.solicitacao?.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedRequest = {...this.solicitacao!, status: 'ARRUMADA'};
        this.requestService.updateRequest(updatedRequest);
        this.router.navigate(['back-office/maintenance-request']);
      }
    });
  }

  openRedirectDialog(): void {
    const dialogRef = this.dialog.open(RedirectModalComponent, {
      width: '1500px',
      height:'250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedRequest = {...this.solicitacao!, status: 'REDIRECIONADA', };
        this.requestService.updateRequest(updatedRequest);
        this.router.navigate(['back-office/maintenance-request']);
      }
    })
  }

  voltar(): void {
    this.router.navigate(['/request-list']);
}
}
