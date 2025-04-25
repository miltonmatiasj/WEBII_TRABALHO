import { Injectable } from '@angular/core';
import { User } from '../User';

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
    return data ? JSON.parse(data).map((rawUser: any) => User.fromJson(rawUser)) : [];
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
