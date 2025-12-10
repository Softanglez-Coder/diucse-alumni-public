import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError, of } from 'rxjs';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth0 = inject(Auth0Service);
  const authService = inject(AuthService);

  // Check Auth0 authentication status
  return auth0.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        // Not authenticated, redirect to login
        authService.markAsUnauthenticated();
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    }),
    catchError(() => {
      // Authentication check failed, redirect to login
      authService.markAsUnauthenticated();
      return of(
        router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        }),
      );
    }),
  );
};
