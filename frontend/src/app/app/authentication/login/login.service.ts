import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly storageKey = 'loginInfo';

  constructor() {}

  saveLoginInfo(email: string, password: string): void {
    const loginInfo = { email, password };
    localStorage.setItem(this.storageKey, JSON.stringify(loginInfo));
  }

  getLoginInfo(): { email: string; password: string } | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearLoginInfo(): void {
    localStorage.removeItem(this.storageKey);
  }
}
