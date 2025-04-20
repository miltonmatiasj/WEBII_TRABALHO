import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RequestService, ServiceRequest } from './services/request.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {
  openRequest: ServiceRequest[] = [];
  columns = ['dataHora', 'clienteCPF', 'descricaoEquipamento', 'acoes'];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.openRequest = this.requestService.getRequests().filter((s) => s.status === 'ABERTA');
  }

}
