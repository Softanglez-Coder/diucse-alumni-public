# Auth0 Integration - Next Steps Checklist

This checklist will help you complete the Auth0 integration and deploy the changes.

## 1. Auth0 Setup (Must Complete Before Testing)

### Create Auth0 Account & Tenant
- [ ] Sign up at https://auth0.com (if you don't have an account)
- [ ] Create a new tenant (or use existing)
- [ ] Note your tenant domain (e.g., `dev-abc123.us.auth0.com`)

### Create Auth0 Application
- [ ] Go to Applications → Applications in Auth0 Dashboard
- [ ] Click "Create Application"
- [ ] Name: "DIUCSE Alumni - Development" (or similar)
- [ ] Type: Single Page Application
- [ ] Click "Create"
- [ ] Copy the **Domain** and **Client ID**

### Configure Application Settings
In your newly created application settings:

- [ ] **Allowed Callback URLs**: Add
  ```
  http://localhost:4200/portal
  ```
  (Add production URL later: `https://csediualumni.com/portal`)

- [ ] **Allowed Logout URLs**: Add
  ```
  http://localhost:4200
  ```
  (Add production URL later: `https://csediualumni.com`)

- [ ] **Allowed Web Origins**: Add
  ```
  http://localhost:4200
  ```
  (Add production URL later: `https://csediualumni.com`)

- [ ] Click "Save Changes"

### Create Auth0 API
- [ ] Go to Applications → APIs in Auth0 Dashboard
- [ ] Click "Create API"
- [ ] Name: "DIUCSE Alumni API"
- [ ] Identifier: `https://api.csediualumni.com` (or your API domain)
- [ ] Signing Algorithm: RS256
- [ ] Click "Create"
- [ ] Copy the **Identifier** (this is your audience)

### Enable Social Connections (Optional)
- [ ] Go to Authentication → Social
- [ ] Enable Google (or other providers)
- [ ] Configure OAuth credentials for each provider
- [ ] Test each connection

## 2. Update Application Code

### Update Auth0 Configuration
- [ ] Open `src/app/core/auth0.config.ts`
- [ ] Update `AUTH0_DEV_CONFIG`:
  ```typescript
  export const AUTH0_DEV_CONFIG: Auth0Config = {
    domain: 'your-dev-domain.us.auth0.com', // Your Auth0 domain
    clientId: 'your-dev-client-id', // Your Auth0 client ID
    audience: 'https://api.csediualumni.com' // Your Auth0 API identifier
  };
  ```
- [ ] Update `AUTH0_PROD_CONFIG` when ready for production

### Verify Configuration
- [ ] Domain matches your Auth0 tenant
- [ ] Client ID matches your Auth0 application
- [ ] Audience matches your Auth0 API identifier
- [ ] Callback URLs are correct

## 3. Backend API Updates

### Implement JWT Validation
- [ ] Install Auth0 JWT library for your backend (Node.js example: `express-oauth2-jwt-bearer`)
- [ ] Configure JWT middleware to validate Auth0 tokens
- [ ] Verify `audience` claim matches your API identifier
- [ ] Verify `issuer` matches Auth0 domain

### Update User Management
- [ ] Use Auth0 `sub` claim as user identifier
- [ ] Create or update user profile on first login
- [ ] Store additional profile data (batch, company, position)
- [ ] Update user lookup queries to use Auth0 ID

### Deprecate Old Endpoints
- [ ] Add deprecation notices to old auth endpoints
- [ ] Keep endpoints for backward compatibility (optional)
- [ ] Plan migration timeline
- [ ] Update API documentation

### Update Profile Endpoints
- [ ] Ensure `/auth/me` returns user profile with Auth0 data
- [ ] Keep profile update endpoints (batch, company, etc.)
- [ ] Test profile updates with Auth0 tokens

## 4. Local Testing

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Start Application
```bash
npm start
```

### Test Authentication Flows
- [ ] Navigate to `http://localhost:4200`
- [ ] Click "Sign In with Auth0"
- [ ] Verify redirect to Auth0 login page
- [ ] Log in with test account
- [ ] Verify redirect back to portal
- [ ] Check that user is authenticated
- [ ] Test logout

### Test Registration
- [ ] Click "Create Account with Auth0"
- [ ] Verify redirect to Auth0 signup
- [ ] Create test account
- [ ] Verify email sent (check Auth0 logs)
- [ ] Verify redirect to portal after signup
- [ ] Test profile completion

### Test Password Reset
- [ ] Click "Forgot Password"
- [ ] Verify redirect to Auth0 password reset
- [ ] Enter email
- [ ] Check for reset email
- [ ] Complete password reset
- [ ] Log in with new password

### Test Protected Routes
- [ ] Log out
- [ ] Try to access `/portal`
- [ ] Verify redirect to login
- [ ] Log in
- [ ] Verify access to portal

### Test Token Refresh
- [ ] Log in
- [ ] Wait for token to expire (or manually expire)
- [ ] Make API call
- [ ] Verify token refreshes automatically
- [ ] Verify API call succeeds

## 5. Production Setup

### Create Production Auth0 Application
- [ ] Create separate production Auth0 application
- [ ] Configure with production URLs
- [ ] Copy Domain and Client ID

### Update Production Configuration
- [ ] Update `AUTH0_PROD_CONFIG` in `auth0.config.ts`
- [ ] Verify production URLs are correct
- [ ] Test hostname detection logic

### Configure Production URLs
- [ ] Update Allowed Callback URLs with production domain
- [ ] Update Allowed Logout URLs with production domain
- [ ] Update Allowed Web Origins with production domain
- [ ] Save changes

### Deploy
- [ ] Build application: `npm run build`
- [ ] Deploy to production
- [ ] Test authentication flows in production
- [ ] Monitor Auth0 logs for errors

## 6. Documentation & Monitoring

### Update Documentation
- [ ] Document Auth0 setup process for team
- [ ] Update user-facing documentation about new login
- [ ] Document password reset process
- [ ] Document social login options

### Set Up Monitoring
- [ ] Enable Auth0 logs
- [ ] Set up log streaming (optional)
- [ ] Configure alerts for failed logins
- [ ] Monitor authentication metrics

### Security Review
- [ ] Review Auth0 security settings
- [ ] Enable MFA (optional)
- [ ] Configure brute force protection
- [ ] Review password policies
- [ ] Enable anomaly detection

## 7. User Communication

### Notify Users
- [ ] Announce new authentication system
- [ ] Explain benefits (social login, better security)
- [ ] Provide migration instructions
- [ ] Set up support channels

### Migration Strategy
- [ ] Plan gradual rollout (optional)
- [ ] Provide fallback to old auth (temporary)
- [ ] Monitor user feedback
- [ ] Address issues quickly

## Troubleshooting

### Common Issues

**Issue: "Callback URL mismatch" error**
- Check Allowed Callback URLs in Auth0 exactly match redirect_uri
- Include port number for localhost (e.g., :4200)

**Issue: CORS errors**
- Add application domain to Allowed Web Origins
- Check API CORS configuration

**Issue: Token not sent to API**
- Verify API URL in httpInterceptor.allowedList
- Check Auth0 audience matches API

**Issue: Infinite redirect loop**
- Check that callback route exists
- Verify Auth0 configuration is correct
- Clear browser cache and cookies

## Support Resources

- **Auth0 Documentation**: https://auth0.com/docs/libraries/auth0-angular
- **Auth0 Community**: https://community.auth0.com/
- **Project Documentation**: 
  - `AUTH0_INTEGRATION.md` - Setup guide
  - `AUTH0_MIGRATION_SUMMARY.md` - Technical details
  - `.env.example` - Configuration reference

## Completion Checklist

Before marking this as complete:
- [ ] All Auth0 accounts and applications created
- [ ] Application code configured with correct credentials
- [ ] Backend updated to validate Auth0 tokens
- [ ] All authentication flows tested locally
- [ ] Production environment configured and tested
- [ ] Documentation updated
- [ ] Users notified
- [ ] Monitoring in place

---

**Note**: Keep your Auth0 credentials secure. Never commit them to version control. Use environment variables or secure configuration management in production.
