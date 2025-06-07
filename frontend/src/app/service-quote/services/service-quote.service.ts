import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import {User} from "../../users/User";

export type Customer = Partial<User>;

export interface Quote{
  id: number;
  price: number;
  dateTime: Data;
  employeeId: number;
  requestId: number;

}

@Injectable({
  providedIn: 'root'
})
export class ServiceQuoteService {

 private mockCustomers: Customer[] = [
    {
      cpf: '11111111111',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-1111',
    },
    {
      cpf: '22222222222',
      name: 'José Santos',
      email: 'jose.santos@email.com',
      phone: '(21) 98888-2222',
    },
    {
      cpf: '33333333333',
      name: 'Joana Costa',
      email: 'joana.costa@email.com',
      phone: '(31) 97777-3333',
    },
    {
      cpf: '44444444444',
      name: 'Joaquina Souza',
      email: 'joaquina.souza@email.com',
      phone: '(41) 96666-4444',
    }
  ];

  getCustomerByCPF(cpf: string): Customer | undefined {
    return this.mockCustomers.find(customer => customer.cpf === cpf);
  }


  constructor() { }
}
