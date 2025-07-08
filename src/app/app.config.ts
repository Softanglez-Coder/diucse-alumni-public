import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Config } from './shared';
import { API_BASE_URL } from './core';
import { authInterceptor, AuthService } from './shared/services';
import { firstValueFrom } from 'rxjs';

let api_base_url: string | undefined;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Combined initializer: Load config first, then check auth
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      
      return new Promise<void>((resolve) => {
        // Phase 1: Load API configuration
        const isProduction = window.location.hostname.includes('csediualumni.com');
        const isDevInProd = window.location.hostname.includes('dev.csediualumni.com');

        let configFile = '';

        if (isDevInProd) {
          configFile = '/data/config.dev.json';
        } else if (isProduction) {
          configFile = '/data/config.prod.json';
        } else {
          configFile = '/data/config.json'; // Use config.json for localhost
        }
        
        console.log(`Loading config from: ${configFile} for hostname: ${window.location.hostname}`);
        
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
            api_base_url = baseUrl;
            console.log(`API Base URL set to: ${baseUrl}`);
            
            // Phase 2: Now check authentication with correct API URL
            console.log('Starting auth check with API URL:', api_base_url);
            
            firstValueFrom(authService.checkAuthStatus()).then(() => {
              console.log('Auth check completed successfully');
              resolve();
            }).catch(() => {
              console.log('Auth check failed during bootstrap - user not authenticated');
              resolve();
            });
          })
          .catch(() => {
            console.error('Failed to load configuration');
            // Fallback URLs based on environment
            const fallbackUrl = window.location.hostname.includes('csediualumni.com') 
              ? 'https://api.csediualumni.com' 
              : 'http://localhost:3000';

            api_base_url = fallbackUrl;
            console.log(`Using fallback API Base URL: ${fallbackUrl}`);
            
            // Still try auth check with fallback URL
            const authService = inject(AuthService);
            firstValueFrom(authService.checkAuthStatus()).then(() => {
              console.log('Auth check completed successfully with fallback URL');
              resolve();
            }).catch(() => {
              console.log('Auth check failed during bootstrap - user not authenticated');
              resolve();
            });
          });
      });
    }),
    // Provide API_BASE_URL token
    {
      provide: API_BASE_URL,
      useFactory: () => {
        const url = api_base_url || 'http://localhost:3000';
        console.log(`API_BASE_URL factory returning: ${url}`);
        return url;
      }
    }
  ]
};