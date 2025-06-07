import {Component, inject, OnInit} from '@angular/core';
import { RequestService } from '../employee-page/services/request.service';
import { Customer } from './services/service-quote.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import {MatButton} from "@angular/material/button";
import {MaintenanceRequest} from "../maintenance-request-form/mainetance-request-form.service";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-service-quote',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    NgxMaskDirective,
  ],
  templateUrl: './service-quote.component.html',
  styleUrl: './service-quote.component.scss'
})
export class ServiceQuoteComponent implements OnInit {
  id?: string;
  request?: MaintenanceRequest;
  customer?: Customer;
  orcamento: { valor: number } = { valor: 0 };
  error: string = '';

  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private serviceRequest: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    try {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      if (!this.id) {
        this.error = 'ID da solicitação não encontrado';
        return;
      }
      this.serviceRequest.getRequestById(this.id).then((request) => {
        this.request = request;
        if (!this.request) {
          this.error = 'Solicitação não encontrada';
          return;
        }

        const user = this.authService.currentUser();
        if (user) {
          this.customer = {
            cpf: user.cpf,
            name: user.name,
            email: user.email,
            phone: user.phone,
          };
        } else {
          this.error = 'Usuário não encontrado';
        }
      })

    } catch (error) {
      this.error = 'Erro ao carregar os dados';
      console.error(error);
    }
  }

  confirmOrcamento() {
    if (this.orcamento.valor && this.orcamento.valor > 0 && this.request != null) {
      console.log('Orçamento confirmado:', this.orcamento.valor);
      this.serviceRequest.updateRequest({...this.request, status: 'ORCADA'});
      this.router.navigate(['/back-office/maintenance-request']);
    } else {
      alert('Valor do orçamento inválido!');
      console.warn('Valor do orçamento não informado!');
    }
  }
}
