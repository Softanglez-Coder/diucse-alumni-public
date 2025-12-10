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

  console.log('🔧 Interceptor - Request URL:', req.url);
  console.log('🔧 Interceptor - API Base URL:', apiBaseUrl);

  // Check if this is an API request that needs authentication
  const isApiRequest = req.url.startsWith(apiBaseUrl);
  
  console.log('🔧 Interceptor - Is API Request:', isApiRequest);
  
  // If it's an API request, attach Auth0 JWT token
  if (isApiRequest) {
    console.log('🔧 Interceptor - Attempting to get Auth0 token...');
    
    return from(auth0.getAccessTokenSilently({ 
      detailedResponse: false,
      cacheMode: 'on',
      authorizationParams: {
        audience: 'https://api.csedialumni.com',
        scope: 'openid profile email'
      }
    })).pipe(
      catchError((err) => {
        console.error('❌ Interceptor - Failed to get token:', err);
        return of(null);
      }),
      switchMap((token) => {
        console.log('🔧 Interceptor - Token obtained:', token ? 'YES (length: ' + token.length + ')' : 'NO');
        
        let authReq = req;
        
        // Add token to Authorization header if available
        if (token) {
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('✅ Interceptor - Authorization header added');
        } else {
          console.warn('⚠️ Interceptor - No token available, proceeding without Authorization header');
        }
        
        return next(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('❌ Interceptor - Request failed:', error.status, error.message);
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
