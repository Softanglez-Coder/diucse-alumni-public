import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, from, Observable } from 'rxjs';
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
  
  // If it's an API request, try to attach Auth0 token
  if (isApiRequest) {
    return from(auth0.getAccessTokenSilently({ 
      detailedResponse: false,
      cacheMode: 'on' 
    }).catch(() => null)).pipe(
      switchMap((token) => {
        let authReq = req;
        
        // If we have a token, add it to the request
        if (token) {
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          });
        } else {
          // No token available, just use cookies
          authReq = req.clone({
            withCredentials: true
          });
        }
        
        return next(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle 401 Unauthorized responses
            if (error.status === 401) {
              // Mark as unauthenticated and redirect to login
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
