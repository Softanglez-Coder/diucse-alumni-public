import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Config } from './shared';
import { API_BASE_URL } from './core';
import { authInterceptor, AuthService } from './shared/services';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(() => {
      return new Promise<void>((resolve) => {
        // Determine which config file to load based on environment
        const isProduction = window.location.hostname.includes('csediualumni.com');
        const isDevInProd = window.location.hostname.includes('dev.csediualumni.com');

        let configFile = '';

        if (isDevInProd) {
          configFile = '/data/config.dev.json';
        } else if (isProduction) {
          configFile = '/data/config.prod.json';
        } else {
          configFile = '/data/config.local.json';
        }
        
        fetch(configFile)
          .then(response => response.json())
          .then((config: Config) => {
            if (!config.baseUrl) {
              console.error('Base URL is not defined in the configuration');
              return resolve();
            }

            // Set the base URL for the application
            const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
            const apiBaseUrl = new URL(baseUrl);
            if (!apiBaseUrl.protocol || !apiBaseUrl.host) {
              console.error('Invalid base URL in the configuration');
              return resolve();
            }

            // Set the API base URL globally
            (window as any).API_BASE_URL = baseUrl;

            console.log(`API Base URL set to: ${baseUrl}`);
            
            resolve();
          })
          .catch(() => {
            console.error('Failed to load configuration');
            // Fallback URLs based on environment
            const fallbackUrl = window.location.hostname.includes('csediualumni.com') 
              ? 'https://api.csediualumni.com' 
              : 'http://localhost:3000';
            (window as any).API_BASE_URL = fallbackUrl;
            resolve();
          });
      });
    }),
    // Check authentication status after API configuration is loaded
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      
      // Return a promise that checks auth status
      return firstValueFrom(authService.checkAuthStatus()).catch(() => {
        // Ignore errors during bootstrap auth check
        console.log('Auth check failed during bootstrap - user not authenticated');
        return Promise.resolve();
      });
    }),
    {
      provide: API_BASE_URL,
      useFactory: () => (window as any).API_BASE_URL || 'http://localhost:3000'
    }
  ]
};