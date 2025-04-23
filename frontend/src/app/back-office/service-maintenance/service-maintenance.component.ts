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
  selector: 'app-service-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './service-maintenance.component.html',
  styleUrls: ['./service-maintenance.component.scss']
})
export class ServiceMaintenanceComponent implements OnInit {
  request: ServiceRequest | undefined;
  descricaoManutencao: string = '';

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

  finalizarManutencao(): void {
    if (this.request) {
      this.request.status = 'ARRUMADA';
      this.request.maintenanceDescription = this.descricaoManutencao;
      this.requestService.updateRequest(this.request);
    }
  }
} 