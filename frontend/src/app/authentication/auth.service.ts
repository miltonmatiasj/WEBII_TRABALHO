import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthMockedService} from './auth-mocked.service';
import {User} from "../User";

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
    this.token.set(savedToken);
    this.email.set(savedEmail);
    this.currentUser.set(User.fromLocalStorage());
  }

  async login(email: string, password: string) {
    this.email.set(email);
    const user = this.authMockedService.findUserByEmail(email);

    if (user && user.comparePassword(password)) {
      const mockToken = 'mock-token-' + Math.random().toString(36).substring(2);
      this.token.set(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('email', email);
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));

      return true;
    }
    return false;
  }

  async logout() {
    this.token.set(null);
    this.email.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    await this.router.navigate(['/login']);
  }
}
