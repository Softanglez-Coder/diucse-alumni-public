import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError, of, take } from 'rxjs';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth0 = inject(Auth0Service);
  const authService = inject(AuthService);

  console.log('🛡️ AuthGuard: Checking access for:', state.url);

  // Check Auth0 authentication status
  return auth0.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      console.log('🛡️ AuthGuard: isAuthenticated =', isAuthenticated);
      if (isAuthenticated) {
        return true;
      } else {
        // Not authenticated, redirect to login
        console.log('🛡️ AuthGuard: Redirecting to /login');
        authService.markAsUnauthenticated();
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    }),
    catchError((error) => {
      // Authentication check failed, redirect to login
      console.error('🛡️ AuthGuard: Error checking auth:', error);
      authService.markAsUnauthenticated();
      return of(
        router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        }),
      );
    }),
  );
};
