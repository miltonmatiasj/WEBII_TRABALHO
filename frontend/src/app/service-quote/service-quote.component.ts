import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

import { RequestService } from '../employee-page/services/request.service';
import {
  Customer,
  ServiceQuoteService,
} from './services/service-quote.service';
import { AuthService } from '../authentication/auth.service';
import { MaintenanceRequest } from '../maintenance-request-form/mainetance-request-form.service';

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
  styleUrl: './service-quote.component.scss',
})
export class ServiceQuoteComponent implements OnInit {
  id?: string;
  request?: MaintenanceRequest;
  customer?: Customer;
  orcamento: { valor: number } = { valor: 0 };
  error: string = '';
  fromUrl: string = '/back-office/maintenance-request';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceRequest: RequestService,
    private serviceQuoteService: ServiceQuoteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    try {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      const from = this.route.snapshot.queryParamMap.get('from');
      if (from) {
        this.fromUrl = from;
      }

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
      });
    } catch (error) {
      this.error = 'Erro ao carregar os dados';
      console.error(error);
    }
  }

  confirmOrcamento() {
    if (
      this.orcamento.valor &&
      this.orcamento.valor > 0 &&
      this.request != null
    ) {
      this.serviceQuoteService.addQuote({
        price: this.orcamento.valor,
        employee: {
          id: this.authService.currentUser()?.id,
        },
        maintenanceRequest: {
          id: this.request.id,
        },
      });

      console.log('Orçamento confirmado:', this.orcamento.valor);
      alert(`Orçamento Confirmado: R$ ${this.orcamento.valor.toFixed(2)}`);
      this.router.navigate([this.fromUrl]);
    } else {
      alert('Valor do orçamento inválido!');
      console.warn('Valor do orçamento não informado!');
    }
  }
}
