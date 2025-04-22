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

@Component({
  selector: 'app-service-quote',
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
  id!: number;
  request?: ServiceRequest;
  customer?: Customer;
  orcamento: { valor: number } = { valor: 0 };

  constructor(private route: ActivatedRoute, private serviceRequest: RequestService, private serviceServiceQuote: ServiceQuoteService) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.request = this.serviceRequest.getRequestById(this.id);

    this.customer = this.serviceServiceQuote.getCustomerByCPF(this.request?.customerCPF ?? '');

  }

  confirmOrcamento() {
    if (this.orcamento.valor) {
      console.log('Orçamento confirmado:', this.orcamento.valor);
    } else {
      console.warn('Valor do orçamento não informado!');
    }
  }
  
  
}
