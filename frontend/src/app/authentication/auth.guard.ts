import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Access the token signal
  const token = authService.token();

  if (token) {
    return true; // Allow route activation
  } else {
    // Redirect to the login page
    router.navigate(['/login']);
    return false;
  }
};
