import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let authRequest = req;

  authRequest = req.clone({
    withCredentials: true,
  });

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized responses, but not for auth check or login requests
      if (
        error.status === 401 &&
        !req.url.includes('/auth/login') &&
        !req.url.includes('/auth/me')
      ) {
        // Try to refresh token first
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Retry original request (cookie will be sent automatically)
            return next(authRequest);
          }),
          catchError(() => {
            // Refresh failed, redirect to login
            authService.markAsUnauthenticated();
            router.navigate(['/login'], {
              queryParams: { returnUrl: router.url },
            });
            return throwError(() => error);
          }),
        );
      }

      // For auth/me requests (bootstrap checks), just pass through the error
      if (error.status === 401 && req.url.includes('/auth/me')) {
        // Auth check failed - user is not authenticated
        authService.markAsUnauthenticated();
      }

      return throwError(() => error);
    }),
  );
};
