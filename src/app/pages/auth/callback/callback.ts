import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <div class="spinner"></div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Authenticating...</h2>
        <p class="text-gray-600">Please wait while we complete your login.</p>
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

  constructor(
    private auth0: Auth0Service,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('🔄 AuthCallback: Initializing');
    
    // Allow Auth0 SDK to process the callback
    // Then redirect to portal once authenticated
    setTimeout(() => {
      this.auth0.isAuthenticated$
        .pipe(takeUntil(this.destroy$))
        .subscribe((isAuthenticated) => {
          console.log('🔄 AuthCallback: Auth status:', isAuthenticated);
          if (isAuthenticated) {
            console.log('🔄 AuthCallback: Redirecting to /portal');
            this.router.navigate(['/portal'], { replaceUrl: true });
          }
        });
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
