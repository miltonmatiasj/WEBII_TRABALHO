import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private router: Router) {}

  redirectBasedOnRole(): void {
    const currentUser = localStorage.getItem('CurrentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.role === 'ADMIN') {
        this.router.navigate(['/back-office/home']);
      } else {
        this.router.navigate(['/customer-home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
} 