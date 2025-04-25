import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { RequestService, ServiceRequest } from '../employee-page/services/request.service';
import { Customer, ServiceQuoteService } from '../service-quote/services/service-quote.service';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceDescriptionModalComponent } from './components/maintenance-description-modal/maintenance-description-modal.component';
import { RedirectModalComponent } from './components/redirect-modal/redirect-modal.component';

@Component({
  selector: 'app-maintenance-screen',
  standalone: true,
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
export class MaintenanceScreenComponent {
  solicitacao!: ServiceRequest | undefined;
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.solicitacao = this.requestService.getRequestById(String(id));
    }

    this.cliente = this.serviceServiceQuote.getCustomerByCPF(this.solicitacao?.customerCPF ?? '');
  }


  openDescriptionMaintenanceDialog(): void {
    const dialogRef = this.dialog.open(MaintenanceDescriptionModalComponent, {
      width: '1500px',
      height:'350px',
      data: { solicitacaoId: this.solicitacao?.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Manutenção salva:', result);
        // Aqui você pode atualizar o status para "ARRUMADA", salvar dados, etc
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
        console.log('Solicitação redirecionada com sucesso:', result);
        // aqui você pode alterar o status da solicitação para "REDIRECIONADA"
      }
    })
  }
  
  voltar(): void {
    this.router.navigate(['/request-list']);
}
}
