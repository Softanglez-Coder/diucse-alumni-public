import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, map } from 'rxjs';
import { API_BASE_URL, getAuth0Config } from '../../core';
import { EnvironmentService } from './environment.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly authState = new BehaviorSubject<boolean>(false); // Start as false, will be updated after server check

  private readonly baseUrl = inject(API_BASE_URL);
  private readonly envService = inject(EnvironmentService);
  private readonly auth0 = inject(Auth0Service);

  constructor(private http: HttpClient) {
    // Auth status will be checked during app initialization
    // Subscribe to Auth0 authentication state
    this.auth0.isAuthenticated$.subscribe(isAuth => {
      this.authState.next(isAuth);
    });
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  /**
   * Initiates Auth0 login flow with Universal Login
   */
  login(email?: string, password?: string): Observable<any> {
    // Redirect to Auth0 Universal Login
    this.auth0.loginWithRedirect({
      appState: { target: '/portal' }
    });
    // Return empty observable as redirect will handle navigation
    return new Observable(observer => observer.complete());
  }

  /**
   * Logout from Auth0 and clear local state
   */
  logout(): Observable<any> {
    this.auth0.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
    this.authState.next(false);
    // Return empty observable as redirect will handle navigation
    return new Observable(observer => observer.complete());
  }

  /**
   * Initiates Auth0 signup flow
   * Auth0 will handle user registration
   */
  register(userData: any): Observable<any> {
    // Redirect to Auth0 signup
    this.auth0.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      },
      appState: { target: '/portal' }
    });
    // Return empty observable as redirect will handle navigation
    return new Observable(observer => observer.complete());
  }

  // Password reset is now handled by Auth0
  forgotPassword(email: string): Observable<any> {
    // Redirect to Auth0 password reset
    const auth0Config = getAuth0Config();
    window.location.href = `https://${auth0Config.domain}/authorize?response_type=code&client_id=${auth0Config.clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&screen_hint=forgot-password`;
    return new Observable(observer => observer.complete());
  }

  resetPassword(token: string, password: string): Observable<any> {
    // Auth0 handles password reset, this is kept for compatibility
    return throwError(() => new Error('Password reset is handled by Auth0'));
  }

  verifyEmail(token: string): Observable<any> {
    // Auth0 handles email verification
    return throwError(() => new Error('Email verification is handled by Auth0'));
  }

  resendVerificationEmail(): Observable<any> {
    // Auth0 handles email verification
    return throwError(() => new Error('Email verification is handled by Auth0'));
  }

  /**
   * Get fresh access token from Auth0
   */
  refreshToken(): Observable<any> {
    return this.auth0.getAccessTokenSilently().pipe(
      tap(() => {
        this.authState.next(true);
      })
    );
  }

  /**
   * Check authentication status with Auth0
   */
  checkAuthStatus(): Observable<any> {
    return this.auth0.isAuthenticated$.pipe(
      tap(isAuth => {
        this.authState.next(isAuth);
      }),
      catchError((error: any) => {
        this.authState.next(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Get current authenticated user profile data from Auth0
   */
  getCurrentUser(): Observable<any> {
    return this.auth0.user$.pipe(
      tap((user) => {
        if (user) {
          this.authState.next(true);
        } else {
          this.authState.next(false);
        }
      }),
      catchError((error: any) => {
        this.authState.next(false);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Get Auth0 access token for API calls
   */
  getAccessToken(): Observable<string> {
    return this.auth0.getAccessTokenSilently();
  }

  isAuthenticated(): boolean {
    // Since cookie is HttpOnly, we rely on the auth state from server responses
    return this.authState.value;
  }

  // Method to update auth state when token becomes invalid
  markAsUnauthenticated(): void {
    this.authState.next(false);
  }
}
