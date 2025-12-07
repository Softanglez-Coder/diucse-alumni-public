import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('config.api_base_url');

// Auth0 Configuration Tokens
export const AUTH0_DOMAIN = new InjectionToken<string>('auth0.domain');
export const AUTH0_CLIENT_ID = new InjectionToken<string>('auth0.client_id');
export const AUTH0_AUDIENCE = new InjectionToken<string>('auth0.audience');
