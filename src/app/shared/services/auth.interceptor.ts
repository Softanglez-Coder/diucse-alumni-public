import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, from } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const auth0 = inject(Auth0Service);
  const router = inject(Router);

  // Auth0 SDK has its own HTTP interceptor configured in app.config.ts
  // This interceptor handles errors and token refresh
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized responses
      if (error.status === 401) {
        // Try to get a fresh token silently
        return from(auth0.getAccessTokenSilently()).pipe(
          switchMap(() => {
            // Token refreshed, retry the request
            return next(req);
          }),
          catchError(() => {
            // Token refresh failed, redirect to login
            authService.markAsUnauthenticated();
            router.navigate(['/login'], {
              queryParams: { returnUrl: router.url },
            });
            return throwError(() => error);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
