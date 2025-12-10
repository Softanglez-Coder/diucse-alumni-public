import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { API_BASE_URL } from '../../core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const auth0 = inject(Auth0Service);
  const router = inject(Router);
  const apiBaseUrl = inject(API_BASE_URL);

  // Check if this is an API request that needs authentication
  const isApiRequest = req.url.startsWith(apiBaseUrl);
  
  // If it's an API request, attach Auth0 JWT token
  if (isApiRequest) {
    return from(auth0.getAccessTokenSilently({ 
      detailedResponse: false,
      cacheMode: 'on' 
    })).pipe(
      catchError(() => of(null)),
      switchMap((token) => {
        let authReq = req;
        
        // Add token to Authorization header if available
        if (token) {
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        
        return next(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle 401 Unauthorized responses
            if (error.status === 401) {
              authService.markAsUnauthenticated();
              router.navigate(['/login'], {
                queryParams: { returnUrl: router.url },
              });
            }
            return throwError(() => error);
          }),
        );
      })
    );
  }
  
  // For non-API requests, just pass through
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.markAsUnauthenticated();
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url },
        });
      }
      return throwError(() => error);
    }),
  );
};
