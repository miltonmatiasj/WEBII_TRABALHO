import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  authService = inject(AuthService);

  canActivate(): boolean {
    const currentUser = this.authService.currentUser();
    console.log(currentUser);
    if (currentUser != null) {
      if (currentUser.isAdmin()) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
