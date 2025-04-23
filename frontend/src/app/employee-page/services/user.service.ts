import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'User';

  constructor() {}

  getUsers(): User[] {
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  getUserById(id: number): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  getUserNameById(id: string): string {
    const user = this.getUserById(id);
    return user ? user.name : 'Usuário não encontrado';
  }
} 