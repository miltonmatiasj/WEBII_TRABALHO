import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MockAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('CurrentUser');

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
