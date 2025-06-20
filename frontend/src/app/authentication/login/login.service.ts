import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //don't know if we need this service, for now, I'll be using the auth.service to login, calling it here
  private readonly storageKey = 'loginInfo';

  constructor() {}

  authService = inject(AuthService);

  async login(email: string, password: string) {
    await this.authService.login(email, password);
  }

  getLoginInfo(): { email: string; password: string } | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearLoginInfo(): void {
    localStorage.removeItem(this.storageKey);
  }
}
