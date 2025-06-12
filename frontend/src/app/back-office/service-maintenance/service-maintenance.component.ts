import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../employee-page/services/request.service';
import {MaintenanceRequest} from "../../maintenance-request-form/mainetance-request-form.service";

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
  request: MaintenanceRequest | undefined;
  descricaoManutencao: string = '';

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requestService.getRequestById(id).then((request) => {
        this.request = request;
      })
    }
  }

  finalizarManutencao(): void {
    if (this.request) {
      this.request.status = 'ARRUMADA';
      this.requestService.changeStatus(this.request.id, this.request.status)
    }
  }
}
