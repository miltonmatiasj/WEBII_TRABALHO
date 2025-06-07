import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  authService = inject(AuthService);

  async canActivate(): Promise<boolean> {
    await this.authService.canNavigate;
    const currentUser = this.authService.currentUser()
    if (currentUser != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
