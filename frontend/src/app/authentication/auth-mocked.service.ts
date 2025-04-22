import { Injectable } from '@angular/core';

export interface User {
  id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string;
    complement?: string;
  };
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthMockedService {
  private storageKey = 'User';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  findUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find((user) => user.email === email);
  }

  findUserByCpf(cpf: string): User | undefined {
    const users = this.getUsers();
    return users.find((user) => user.cpf === cpf);
  }
}
