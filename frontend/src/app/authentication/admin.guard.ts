import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  authService = inject(AuthService);

  async canActivate(): Promise<boolean> {
    await this.authService.canNavigate;
    const currentUser = this.authService.currentUser();
    console.log(111, currentUser);
    if (currentUser != null) {
      if (currentUser.isFuncionario()) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
