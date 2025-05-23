import {effect, inject, Injectable, signal} from '@angular/core';
import {User} from "./User";
import {AuthService, LoginResponse} from "../authentication/auth.service";
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  me = signal<User | null>(null);
  authService = inject(AuthService);
  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        const user = User.fromLocalStorage();
        if (user) {
          this.me.set(user);
        } else {
          //call api to get user
          this.me.set(null);
        }
      }
    });
  }

  isUserValid(user: User) {

  }

  http = inject(HttpClient)

  async createUser(user: User, password: string) {
    const loginResult = await lastValueFrom(this.http.post<LoginResponse>(environment.baseUrl + '/auth/login', {
      "email": user.email,
      "name": user.name,
      "password": password,
      "roles": ["FUNCIONARIO"]
    }));
    if (loginResult == null) {
      return;
    }
    localStorage.setItem('token', loginResult.token);
    localStorage.setItem('email', user.email);

  }
}
