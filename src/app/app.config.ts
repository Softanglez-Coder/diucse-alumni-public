import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Config } from './shared';
import { API_BASE_URL } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      return new Promise<void>((resolve) => {
        fetch('/data/config.json')
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
            resolve();
          });
      });
    }),
    {
      provide: API_BASE_URL,
      useFactory: () => (window as any).API_BASE_URL || 'https://api-dev.csediualumni.com'
    }
  ]
};