/**
 * Auth0 Configuration
 * 
 * IMPORTANT: Replace these placeholder values with your actual Auth0 credentials
 * before deploying to production.
 * 
 * To get these values:
 * 1. Go to https://manage.auth0.com/
 * 2. Select your application
 * 3. Copy Domain and Client ID from Basic Information
 * 4. Create an API and copy its Identifier for the Audience
 */

export interface Auth0Config {
  domain: string;
  clientId: string;
  audience: string;
}

/**
 * Development Auth0 Configuration
 * Replace with your Auth0 development tenant credentials
 */
export const AUTH0_DEV_CONFIG: Auth0Config = {
  domain: 'csediualumni.us.auth0.com',
  clientId: '8cJDXN0svn090g4pqmS99Fqq7sOjYR6o',
  audience: 'https://api.csedialumni.com'
};

/**
 * Production Auth0 Configuration
 * Replace with your Auth0 production tenant credentials
 */
export const AUTH0_PROD_CONFIG: Auth0Config = {
  domain: 'csediualumni.us.auth0.com',
  clientId: '8cJDXN0svn090g4pqmS99Fqq7sOjYR6o',
  audience: 'https://api.csedialumni.com'
};

/**
 * Get Auth0 configuration based on environment
 */
export function getAuth0Config(): Auth0Config {
  // Use exact match or endsWith to prevent subdomain confusion
  const hostname = window.location.hostname;
  const isProduction = hostname === 'csediualumni.com' || hostname === 'www.csediualumni.com';
  return isProduction ? AUTH0_PROD_CONFIG : AUTH0_DEV_CONFIG;
}
