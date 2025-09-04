# Cookie-Based Authentication Implementation Guide

## Overview

This Angular application implements cookie-based authentication with your API. The cookies are configured to work across the main domain and subdomains.

## Environment Configuration

### Production

- **API URL**: `https://api.csediualumni.com`
- **Main App**: `https://csediualumni.com`
- **Admin App**: `https://admin.csediualumni.com`
- **Cookie Domain**: `.csediualumni.com` (allows sharing across subdomains)
- **Cookie Secure**: `true` (HTTPS only)

### Development

- **API URL**: `http://localhost:3000`
- **Main App**: `http://localhost:4200`
- **Admin App**: `http://localhost:4300`
- **Cookie Domain**: `localhost`
- **Cookie Secure**: `false`

## Backend Requirements

### Cookie Configuration

The backend should set cookies with the following attributes:

#### Production

```
Set-Cookie: auth_token=<jwt_token>; Path=/; Domain=.csediualumni.com; HttpOnly; Secure; SameSite=Lax; Max-Age=<expiry>
```

#### Development

```
Set-Cookie: auth_token=<jwt_token>; Path=/; Domain=localhost; HttpOnly; SameSite=Lax; Max-Age=<expiry>
```

### API Endpoints Required

1. **POST /auth/login**

   - Body: `{ email, password }`
   - Response: Sets cookie and returns user data
   - Cookie expiry: 1 day (session-based)

2. **POST /auth/logout**

   - Clears the auth cookie
   - Response: Success message

3. **POST /auth/register**

   - Body: User registration data
   - Response: Success message (email verification required)

4. **POST /auth/refresh**

   - Validates current cookie and issues new one if valid
   - Response: New cookie with extended expiry

5. **GET /auth/me**

   - Validates current cookie
   - Response: Current user data or 401 if invalid

6. **POST /auth/forgot-password**

   - Body: `{ email }`
   - Response: Success message

7. **POST /auth/reset-password**

   - Body: `{ token, password }`
   - Response: Success message

8. **POST /auth/verify-email**
   - Body: `{ token }`
   - Response: Success message

### CORS Configuration

The backend must be configured to accept credentials from the frontend domains:

```javascript
// Express.js example
app.use(
  cors({
    origin: ["https://csediualumni.com", "https://admin.csediualumni.com", "http://localhost:4200", "http://localhost:4300"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

### Error Handling

- Return 401 for invalid/expired tokens
- Return appropriate error messages for validation failures
- Handle refresh token scenarios

### Security Considerations

1. Use `HttpOnly` cookies to prevent XSS attacks
2. Use `Secure` flag in production (HTTPS only)
3. Use `SameSite=Lax` to prevent CSRF attacks
4. Implement proper token validation and expiry
5. Use strong, random token generation
6. Implement rate limiting for authentication endpoints

## Frontend Implementation Details

### Authentication Service

- Automatically includes cookies in requests with `withCredentials: true`
- Handles token refresh automatically via HTTP interceptor
- Manages authentication state with reactive streams
- Provides proper cookie domain configuration per environment

### Guards

- `authGuard`: Protects authenticated routes, redirects to login if not authenticated
- `guestGuard`: Prevents authenticated users from accessing login/register pages

### HTTP Interceptor

- Automatically adds Bearer token to requests (if backend also supports headers)
- Handles 401 responses by attempting token refresh
- Redirects to login on authentication failures

### Route Protection

All portal routes are protected with `authGuard`, and authentication routes use `guestGuard`.

## Testing

1. Test login/logout flow
2. Verify cookie sharing between subdomains in production
3. Test automatic token refresh
4. Verify proper redirection on authentication failures
