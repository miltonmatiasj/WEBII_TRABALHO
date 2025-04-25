import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AuthMockedService, User} from './auth-mocked.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email = signal<string | null>(null)
  token = signal<string | null>(null)
  currentUser = signal<User | null>(null)
  http = inject(HttpClient)
  router = inject(Router)
  authMockedService = inject(AuthMockedService)

  constructor() {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    const savedUser = localStorage.getItem('CurrentUser');
    this.token.set(savedToken);
    this.email.set(savedEmail);
    this.currentUser.set(savedUser ? JSON.parse(savedUser) : null);
  }

  async login(email: string, password: string) {
    this.email.set(email);
    const user = this.authMockedService.findUserByEmail(email);
    
    if (user && user.password === password) {
      // Gerar um token mockado
      const mockToken = 'mock-token-' + Math.random().toString(36).substring(2);
      this.token.set(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('email', email);
      
      // Armazenar dados do usuário
      this.currentUser.set(user);
      localStorage.setItem('CurrentUser', JSON.stringify(user));
      
      return true;
    }
    return false;
  }
}
