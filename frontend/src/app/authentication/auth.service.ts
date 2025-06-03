import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../users/User";

export type LoginResponse = {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email = signal<string | null>(null)
  token = signal<string | null>(null)
  http = inject(HttpClient)
  router = inject(Router)
  currentUser = signal<User | undefined>(undefined);

  constructor() {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    this.token.set(savedToken);
    this.email.set(savedEmail);
  }
  async login(email: string, password: string) {
    const loginResult = await lastValueFrom(this.http.post<LoginResponse>(environment.baseUrl + '/auth/login', {email, password}))
      .catch(() => {
        console.log('Erro ao fazer login.');
        return null;
      });
    if (loginResult == null) {
      return;
    }
    localStorage.setItem('token', loginResult.token);
    localStorage.setItem('email', email);
    await this._getMe();
    console.log('here');
    await this.router.navigate(['/customer-home'])
  }

  async _getMe() {
    const meResult = await lastValueFrom(this.http.get<any>(environment.baseUrl + '/users/me'))
      .catch(() => {
        console.log('Erro ao buscar usuário.');
        return null;
      });
    if (meResult == null) {
      return;
    }
    const user = User.fromJson(meResult);
    this.currentUser.set(user);
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  isLoggedIn() {
    return this.token() != null;
  }
}
