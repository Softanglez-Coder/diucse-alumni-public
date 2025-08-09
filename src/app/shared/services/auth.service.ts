import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { API_BASE_URL } from '../../core';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly authState = new BehaviorSubject<boolean>(false); // Start as false, will be updated after server check

  private readonly baseUrl = inject(API_BASE_URL);
  private readonly envService = inject(EnvironmentService);

  constructor(private http: HttpClient) {
    // Auth status will be checked during app initialization
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, { email, password }, {
      withCredentials: true,
      observe: 'response'
    }).pipe(
      tap((response: any) => {
        // Backend sets the cookie automatically via Set-Cookie header
        // Update auth state since login was successful
        this.authState.next(true);
      })
    );
  }

  logout(): Observable<any> {
    const url = `${this.baseUrl}/auth/logout`;
    return this.http.post(url, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.authState.next(false);
      })
    );
  }

  register(userData: any): Observable<any> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post(url, userData, { withCredentials: true });
  }

  forgotPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/auth/forgot-password`;
    return this.http.post(url, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;
    return this.http.patch(url, { password });
  }

  verifyEmail(token: string): Observable<any> {
    const url = `${this.baseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;
    return this.http.patch(url, {});
  }

  resendVerificationEmail(): Observable<any> {
    const url = `${this.baseUrl}/auth/resend-verification-email`;
    return this.http.post(url, {}, { withCredentials: true });
  }

  refreshToken(): Observable<any> {
    const url = `${this.baseUrl}/auth/refresh`;
    return this.http.post(url, {}, {
      withCredentials: true,
      observe: 'response'
    }).pipe(
      tap((response: any) => {
        // Backend refreshes the cookie automatically via Set-Cookie header
        this.authState.next(true);
      })
    );
  }

  checkAuthStatus(): Observable<any> {
    const url = `${this.baseUrl}/auth/me`;
    return this.http.get(url, { withCredentials: true }).pipe(
      tap(() => {
        this.authState.next(true);
      }),
      catchError((error: any) => {
        this.authState.next(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get current authenticated user profile data
   */
  getCurrentUser(): Observable<any> {
    const url = `${this.baseUrl}/auth/me`;
    return this.http.get(url, { withCredentials: true }).pipe(
      tap(() => {
        this.authState.next(true);
      }),
      catchError((error: any) => {
        this.authState.next(false);
        return throwError(() => error);
      })
    );
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
