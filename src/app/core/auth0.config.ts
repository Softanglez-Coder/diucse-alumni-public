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
 * Production Auth0 Configuration (Single Environment)
 */
export const AUTH0_CONFIG: Auth0Config = {
  domain: 'csediualumni.us.auth0.com',
  clientId: '8cJDXN0svn090g4pqmS99Fqq7sOjYR6o',
  audience: 'https://api.csediualumni.com'
};

/**
 * Get Auth0 configuration (always returns production config)
 */
export function getAuth0Config(): Auth0Config {
  return AUTH0_CONFIG;
}
