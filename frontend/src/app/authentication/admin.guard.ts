import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.role === 'ADMIN') {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
} 