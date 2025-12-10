import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { map, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth0 = inject(Auth0Service);

  // If user is authenticated with Auth0, redirect to portal
  // Use take(1) to avoid multiple emissions
  return auth0.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      console.log('🛡️ GuestGuard: isAuthenticated =', isAuthenticated, 'for route:', state.url);
      if (isAuthenticated) {
        console.log('🛡️ GuestGuard: Redirecting to /portal');
        return router.createUrlTree(['/portal']);
      }
      return true;
    })
  );
};
