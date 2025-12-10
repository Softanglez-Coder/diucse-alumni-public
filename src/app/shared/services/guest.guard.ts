import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth0 = inject(Auth0Service);

  // If user is authenticated with Auth0, redirect to portal
  return auth0.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return router.createUrlTree(['/portal']);
      }
      return true;
    })
  );
};
