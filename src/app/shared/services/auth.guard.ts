import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Always verify with backend instead of relying on local state
  // This ensures proper auth check even after page refresh
  return authService.checkAuthStatus().pipe(
    map(() => true),
    catchError(() => {
      // Authentication failed, redirect to login
      authService.markAsUnauthenticated();
      return of(
        router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        }),
      );
    }),
  );
};
