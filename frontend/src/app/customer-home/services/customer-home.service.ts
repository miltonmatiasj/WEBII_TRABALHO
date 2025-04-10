import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CustomerData {
  description: string;
  status: string;
  data: string;
  action: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerHomeService {
  private mockData: CustomerData[] = [
    {
      description: 'Manutenção de Ar Condicionado',
      status: 'Pendente',
      data: '2023-10-01',
      action: 'Detalhes',
    },
    {
      description: 'Manutenção de Ar Condicionado',
      status: 'Pendente',
      data: '2023-10-01',
      action: 'Detalhes',
    },
    {
      description: 'Manutenção de Ar Condicionado',
      status: 'Pendente',
      data: '2023-10-01',
      action: 'Detalhes',
    },
    {
      description: 'Manutenção de Ar Condicionado',
      status: 'Pendente',
      data: '2023-10-01',
      action: 'Detalhes',
    },
    {
      description: 'Manutenção de Ar Condicionado',
      status: 'Pendente',
      data: '2023-10-01',
      action: 'Detalhes',
    },
  ];

  constructor() {}

  getCustomerData(): Observable<CustomerData[]> {
    return of(this.mockData);
  }
}
