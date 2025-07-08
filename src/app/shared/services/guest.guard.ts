import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // If user is authenticated, redirect to portal
  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/portal']);
  }

  return true;
};
