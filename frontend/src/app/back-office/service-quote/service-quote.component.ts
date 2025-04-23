import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ServiceRequest, RequestService } from '../../employee-page/services/request.service';

@Component({
  selector: 'app-service-quote',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './service-quote.component.html',
  styleUrls: ['./service-quote.component.scss']
})
export class ServiceQuoteComponent implements OnInit {
  request: ServiceRequest | undefined;
  valorOrcamento: number = 0;
  descricaoServico: string = '';

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.request = this.requestService.getRequestById(id);
    }
  }

  salvarOrcamento(): void {
    if (this.request) {
      this.request.status = 'ORCADA';
      this.request.quoteValue = this.valorOrcamento;
      this.request.serviceDescription = this.descricaoServico;
      this.requestService.updateRequest(this.request);
    }
  }
} 