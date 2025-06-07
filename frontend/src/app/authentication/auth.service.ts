import {effect, inject, Injectable, signal} from '@angular/core';
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
  loading = signal(true);
  email = signal<string | null>(null)
  token = signal<string | null>(null)
  http = inject(HttpClient)
  router = inject(Router)
  currentUser = signal<User | undefined>(undefined);
  canNavigate: Promise<boolean>;

  constructor() {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    this.token.set(savedToken);
    this.email.set(savedEmail);
    this.loading.set(true);
    let resolvable: (value: (boolean | PromiseLike<boolean>)) => void;
    this.canNavigate = new Promise((resolve) => {
      resolvable = resolve;
    });
    effect(() => {
      const currentEmail = this.email();
      const currentToken = this.token();
      console.log('current email', currentEmail, currentToken);
      if (currentEmail && currentToken) {
        this._getMe().then(() => {
          console.log('saved email', savedEmail, savedToken);
          this.loading.set(false);
          resolvable!(true);
        })
      } else {
        this.currentUser.set(undefined);
        this.loading.set(false);
        resolvable!(false);
      }
    })
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
