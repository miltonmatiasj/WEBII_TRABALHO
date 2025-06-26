import {Component, inject, OnInit} from '@angular/core';
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
import {MaintenanceExecutionService} from "../maintenance-execution/maintenance-execution.service";
import {AuthService} from "../authentication/auth.service";

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

  maintenanceExecutionService = inject(MaintenanceExecutionService);
  authService = inject(AuthService);

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
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
  }


  openDescriptionMaintenanceDialog(): void {
    const dialogRef = this.dialog.open(MaintenanceDescriptionModalComponent, {
      width: '700px',
      minWidth: '700px',
      maxWidth: '700px',
      height:'450px',
      data: { solicitacaoId: this.solicitacao?.id }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && this.solicitacao?.id) {
        const employeeId = this.authService.currentUser()?.id;
        await this.maintenanceExecutionService.execute({
          maintenanceRequest: {id: this.solicitacao.id},
          description: result.descricao,
          orientations: result.orientacoes,
          employee: {id: employeeId}
        });
        await this.router.navigate(['back-office/maintenance-request']);
      }
    });
  }


  openRedirectDialog(): void {
    const dialogRef = this.dialog.open(RedirectModalComponent, {
      width: '1500px',
      height:'250px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && this.solicitacao?.id) {
        await this.requestService.changeStatus(this.solicitacao.id, 'REDIRECIONADA', undefined, result.para);
        await this.router.navigate(['back-office/maintenance-request']);
      }
    })
  }

  voltar(): void {
    this.router.navigate(['/request-list']);
}

  voltar(): void {
    this.router.navigate(['/request-list']);
  }









  back(): void {
    this.router.navigate(['/request-list']);
  }
  anterior(): void {
    this.router.navigate(['/request-list']);
  }
  voltar(): void {
    this.router.navigate(['/request-list']);
  }





  voltar(): void {
    this.router.navigate(['/request-list']);
  }

}
