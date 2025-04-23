import { Component, OnInit } from '@angular/core';
import { ServiceRequest, RequestService } from '../employee-page/services/request.service';
import { Customer } from './services/service-quote.service';
import { ServiceQuoteService } from './services/service-quote.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

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
  ],
  templateUrl: './service-quote.component.html',
  styleUrl: './service-quote.component.scss'
})
export class ServiceQuoteComponent implements OnInit {
  id!: string;
  request?: ServiceRequest;
  customer?: Customer;
  orcamento: { valor: number } = { valor: 0 };
  error: string = '';

  constructor(
    private route: ActivatedRoute, 
    private serviceRequest: RequestService, 
    private serviceServiceQuote: ServiceQuoteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    try {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      
      if (!this.id) {
        this.error = 'ID da solicitação não encontrado';
        return;
      }

      this.request = this.serviceRequest.getRequestById(this.id);
      
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
          password: '',
          addressId: 0
        };
      } else {
        this.error = 'Usuário não encontrado';
      }
    } catch (error) {
      this.error = 'Erro ao carregar os dados';
      console.error(error);
    }
  }

  confirmOrcamento() {
    if (this.orcamento.valor) {
      console.log('Orçamento confirmado:', this.orcamento.valor);
    } else {
      console.warn('Valor do orçamento não informado!');
    }
  }
}
