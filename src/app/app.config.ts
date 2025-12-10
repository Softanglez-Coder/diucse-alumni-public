import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_BASE_URL, getAuth0Config } from './core';
import { authInterceptor, AuthService } from './shared/services';
import { firstValueFrom } from 'rxjs';
import { provideAuth0 } from '@auth0/auth0-angular';

function getBaseUrl(): string {
  // Use exact match or endsWith to prevent subdomain confusion
  const hostname = window.location.hostname;
  const isProduction = hostname === 'csediualumni.com' || hostname === 'www.csediualumni.com';
  const isLocalhost = hostname === 'localhost';

  let baseUrl = '';

  if (isLocalhost) {
    baseUrl = 'http://localhost:3000';
  } else if (isProduction) {
    baseUrl = 'https://api.csediualumni.com';
  } else {
    baseUrl = 'http://localhost:3000'; // Fallback for other environments
  }

  console.log(`Base URL determined: ${baseUrl}`);
  return baseUrl;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Auth0 configuration
    provideAuth0({
      domain: getAuth0Config().domain,
      clientId: getAuth0Config().clientId,
      authorizationParams: {
        redirect_uri: window.location.origin + '/portal',
        audience: getAuth0Config().audience,
        scope: 'openid profile email'
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${getBaseUrl()}/*`,
            tokenOptions: {
              authorizationParams: {
                audience: getAuth0Config().audience,
              }
            }
          }
        ]
      }
    }),
    // Combined initializer: Load config first, then check auth
    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return new Promise<void>((resolve) => {
        // Phase 1: Load API configuration

        const api_base_url = getBaseUrl();

        // Phase 2: Now check authentication with correct API URL
        console.log('Starting auth check with API URL:', api_base_url);

        firstValueFrom(authService.checkAuthStatus())
          .then(() => {
            console.log('Auth check completed successfully');
            resolve();
          })
          .catch(() => {
            console.log(
              'Auth check failed during bootstrap - user not authenticated',
            );
            resolve();
          });
      });
    }),
    // Provide API_BASE_URL token
    {
      provide: API_BASE_URL,
      useFactory: () => {
        const api_base_url = getBaseUrl();
        const url = api_base_url || 'http://localhost:3000';
        console.log(`API_BASE_URL factory returning: ${url}`);
        return url;
      },
    },
  ],
};
