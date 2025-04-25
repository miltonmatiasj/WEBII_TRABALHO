import {inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private router: Router) {}
  authService = inject(AuthService);

  redirectBasedOnRole(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser != null) {
      if (currentUser.isAdmin()) {
        this.router.navigate(['/back-office/home']);
      } else {
        this.router.navigate(['/customer-home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
