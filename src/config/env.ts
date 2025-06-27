/**
 * Environment configuration
 * All environment variables used in the application
 */

export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  
  // Application Configuration
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_BETA_FEATURES: import.meta.env.VITE_ENABLE_BETA_FEATURES === 'true',
} as const;

// Type-safe environment variables
export type Environment = typeof env;

// Utility function to check if we're in development
export const isDevelopment = () => env.ENVIRONMENT === 'development';

// Utility function to check if we're in production
export const isProduction = () => env.ENVIRONMENT === 'production';

// API URL builder utility
export const buildApiUrl = (endpoint: string) => {
  const baseUrl = env.API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Debug logger utility
export const debugLog = (...args: any[]) => {
  if (env.DEBUG_MODE) {
    console.log('[DEBUG]', ...args);
  }
};
