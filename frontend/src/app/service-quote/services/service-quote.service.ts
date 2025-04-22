import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

export interface Customer{
  cpf: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addressId: number;
}

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
      password: 'senha123',
      addressId: 1
    },
    {
      cpf: '22222222222',
      name: 'José Santos',
      email: 'jose.santos@email.com',
      phone: '(21) 98888-2222',
      password: 'senha123',
      addressId: 2
    },
    {
      cpf: '33333333333',
      name: 'Joana Costa',
      email: 'joana.costa@email.com',
      phone: '(31) 97777-3333',
      password: 'senha123',
      addressId: 3
    },
    {
      cpf: '44444444444',
      name: 'Joaquina Souza',
      email: 'joaquina.souza@email.com',
      phone: '(41) 96666-4444',
      password: 'senha123',
      addressId: 4
    }
  ];

  getCustomerByCPF(cpf: string): Customer | undefined {
    return this.mockCustomers.find(customer => customer.cpf === cpf);
  }
  

  constructor() { }
}
