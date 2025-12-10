import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Subject, takeUntil, filter, take, timeout, catchError, of } from 'rxjs';

@Component({
  selector: 'auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <div class="spinner"></div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ message }}</h2>
        <p class="text-gray-600">{{ subMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .callback-content {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .spinner {
      border: 4px solid #f3f4f6;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `],
})
export class AuthCallback implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  message = 'Authenticating...';
  subMessage = 'Please wait while we complete your login.';

  constructor(
    private auth0: Auth0Service,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('🔄 AuthCallback: Starting callback processing');
    console.log('🔄 AuthCallback: Current URL:', window.location.href);
    
    // Wait for Auth0 to process the callback, then check authentication
    // Auth0 SDK automatically handles the callback when the component loads
    this.auth0.isLoading$
      .pipe(
        filter(loading => !loading), // Wait until Auth0 finishes loading
        take(1),
        takeUntil(this.destroy$),
        timeout(10000), // 10 second timeout
        catchError(error => {
          console.error('🔄 AuthCallback: Timeout or error:', error);
          this.message = 'Authentication timed out';
          this.subMessage = 'Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
          return of(false);
        })
      )
      .subscribe(() => {
        // Now check if authenticated
        this.auth0.isAuthenticated$
          .pipe(take(1))
          .subscribe((isAuthenticated) => {
            console.log('🔄 AuthCallback: Auth status:', isAuthenticated);
            if (isAuthenticated) {
              this.message = 'Success!';
              this.subMessage = 'Redirecting to portal...';
              console.log('🔄 AuthCallback: Redirecting to /portal');
              setTimeout(() => {
                this.router.navigate(['/portal'], { replaceUrl: true });
              }, 500);
            } else {
              console.error('🔄 AuthCallback: Not authenticated after callback');
              this.message = 'Authentication failed';
              this.subMessage = 'Redirecting to login...';
              setTimeout(() => {
                this.router.navigate(['/login'], { replaceUrl: true });
              }, 2000);
            }
          });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
