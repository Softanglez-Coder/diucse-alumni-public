# Auth0 Integration Guide

## Overview

This application has been integrated with Auth0 for authentication and authorization. Auth0 provides a secure, flexible authentication platform that supports:

- Email/password authentication
- Social login (Google, Facebook, Twitter, GitHub, etc.)
- Multi-factor authentication (MFA)
- Password reset flows
- Email verification
- Single Sign-On (SSO)

## Configuration Required

Before running the application, you need to configure Auth0 credentials:

### 1. Create an Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application (Single Page Application)
3. Note your **Domain** and **Client ID**

### 2. Configure Application Settings

In your Auth0 Application settings:

**Allowed Callback URLs:**
```
http://localhost:4200/portal,
https://your-production-domain.com/portal
```

**Allowed Logout URLs:**
```
http://localhost:4200,
https://your-production-domain.com
```

**Allowed Web Origins:**
```
http://localhost:4200,
https://your-production-domain.com
```

### 3. Create an Auth0 API

1. Go to APIs in Auth0 Dashboard
2. Create a new API
3. Set the **Identifier** (e.g., `https://api.csediualumni.com`)
4. Note this identifier - you'll use it as the `audience`

### 4. Update Application Configuration

Update the Auth0 configuration in your code:

#### `src/app/core/auth0.config.ts`

Replace the placeholder values with your Auth0 credentials:

```typescript
export const AUTH0_DEV_CONFIG: Auth0Config = {
  domain: 'your-dev-domain.us.auth0.com', // Replace with your Auth0 development domain
  clientId: 'your-dev-client-id', // Replace with your Auth0 development client ID
  audience: 'https://api.csediualumni.com' // Replace with your Auth0 API identifier
};

export const AUTH0_PROD_CONFIG: Auth0Config = {
  domain: 'your-prod-domain.us.auth0.com', // Replace with your Auth0 production domain
  clientId: 'your-prod-client-id', // Replace with your Auth0 production client ID
  audience: 'https://api.csediualumni.com' // Replace with your Auth0 API identifier
};
```

The application will automatically use development or production config based on the hostname.

## Features

### Authentication Flow

1. **Login**: Users are redirected to Auth0 Universal Login page
2. **Registration**: Users are redirected to Auth0 signup page
3. **Password Reset**: Handled by Auth0
4. **Email Verification**: Handled by Auth0
5. **Token Management**: Automatic token refresh via Auth0 SDK

### User Profile

After authentication with Auth0, users can:
- View their Auth0 profile information
- Update additional profile fields (batch, company, position) via the portal

### Protected Routes

Routes protected by `authGuard` require authentication:
- `/portal/*` - All portal routes

Routes protected by `guestGuard` redirect authenticated users:
- `/login` - Login page
- `/register` - Registration page

## Backend Integration

Your backend API should:

1. Validate Auth0 JWT tokens
2. Use the Auth0 user ID (`sub` claim) as the user identifier
3. Store additional user profile data (batch, company, etc.)
4. Accept tokens with the correct `audience` claim

### Example Backend Token Validation (Node.js)

```javascript
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://api.csediualumni.com',
  issuerBaseURL: 'https://your-auth0-domain.us.auth0.com/',
});

app.use(checkJwt);
```

## Changes Made

### Files Modified

1. **package.json** - Added `@auth0/auth0-angular` dependency
2. **src/app/core/auth0.config.ts** - Created Auth0 configuration file (NEW)
3. **src/app/core/tokens.ts** - Added Auth0 configuration tokens
4. **src/app/core/index.ts** - Export Auth0 config
5. **src/app/app.config.ts** - Added Auth0 provider configuration
6. **src/app/shared/services/auth.service.ts** - Replaced custom auth with Auth0
7. **src/app/shared/services/auth.guard.ts** - Updated to use Auth0 authentication state
8. **src/app/shared/services/guest.guard.ts** - Updated to use Auth0 authentication state
9. **src/app/shared/services/auth.interceptor.ts** - Updated to use Auth0 token handling
10. **src/app/pages/auth/login/login.ts** - Updated to redirect to Auth0 login
11. **src/app/pages/auth/login/login.html** - Simplified to Auth0 login button
12. **src/app/pages/auth/register/register.ts** - Updated to redirect to Auth0 signup
13. **src/app/pages/auth/register/register.html** - Simplified to Auth0 signup button
14. **src/app/pages/auth/forgot-password/forgot-password.ts** - Updated to redirect to Auth0

### Removed Functionality

The following authentication endpoints are no longer used:
- `/auth/login` - Replaced by Auth0 Universal Login
- `/auth/register` - Replaced by Auth0 signup
- `/auth/forgot-password` - Replaced by Auth0 password reset
- `/auth/reset-password` - Replaced by Auth0
- `/auth/verify-email` - Replaced by Auth0
- `/auth/resend-verification-email` - Replaced by Auth0
- `/auth/refresh` - Replaced by Auth0 token refresh
- `/auth/logout` - Replaced by Auth0 logout

### Backend Changes Needed

Your backend should:
1. Remove old authentication endpoints (or keep for backward compatibility)
2. Implement JWT validation for Auth0 tokens
3. Update user identification to use Auth0 `sub` claim
4. Maintain user profile data storage (batch, company, position, etc.)

## Testing

### Local Development

1. Configure Auth0 credentials as described above
2. Start the application: `npm start`
3. Navigate to `http://localhost:4200`
4. Click "Sign In with Auth0" - you'll be redirected to Auth0
5. Sign up or log in
6. You'll be redirected back to `/portal`

### Social Connections

To enable social login:
1. Go to Auth0 Dashboard → Authentication → Social
2. Enable desired social connections (Google, Facebook, etc.)
3. Configure each connection with OAuth credentials

## Security Considerations

1. **HTTPS Required**: Auth0 requires HTTPS in production
2. **Token Storage**: Tokens are stored securely by Auth0 SDK
3. **XSS Protection**: Use Content Security Policy headers
4. **CORS**: Configure proper CORS settings on your backend
5. **Token Validation**: Always validate tokens on the backend

## Troubleshooting

### Issue: Infinite redirect loop
**Solution**: Check that callback URLs are properly configured in Auth0

### Issue: CORS errors
**Solution**: Add your domain to Allowed Web Origins in Auth0

### Issue: Token not being sent to API
**Solution**: Verify the API endpoint is in the `allowedList` in `httpInterceptor` config

### Issue: "Invalid audience" error
**Solution**: Ensure the `audience` in your config matches your Auth0 API identifier

## Legacy Pages

The following pages are retained for backward compatibility but are no longer actively used with Auth0:

### Password Reset (`/reset-password`)
Auth0 handles password reset flows. Users should use the "Forgot Password" link which redirects to Auth0.

### Email Verification (`/verify-email`)
Auth0 handles email verification automatically. Users will receive verification emails from Auth0.

These pages may show errors when accessed because the backend endpoints have been replaced by Auth0.

- [Auth0 Angular SDK Documentation](https://auth0.com/docs/libraries/auth0-angular)
- [Auth0 Dashboard](https://manage.auth0.com/)
- [Auth0 Quickstarts](https://auth0.com/docs/quickstarts)
