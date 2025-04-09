import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

type LoginResponse = {
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email = signal<string | null>(null)
  token = signal<string | null>(null)
  http = inject(HttpClient)
  router = inject(Router)

  constructor() {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    this.token.set(savedToken);
    this.email.set(savedEmail);
  }

  async login(email: string, password: string) {
    this.email.set(email);
    await lastValueFrom(this.http.post<LoginResponse>(environment.baseUrl + '/api/auth/login', {email, password})).catch(() => {
      //FIXME: handle error
    })
  }

  async logout() {
    this.token.set(null);
    this.email.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    await this.router.navigate(['/login']);
  }
}
