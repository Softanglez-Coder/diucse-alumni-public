import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-6 shadow-lg"
          >
            <svg
              class="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              @if (isVerifying || isSuccess) {
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              } @else if (hasError) {
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              } @else {
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              }
            </svg>
          </div>

          @if (hasToken) {
            @if (isVerifying) {
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Verifying Email
              </h1>
              <p class="text-lg text-gray-600 leading-relaxed">
                Please wait while we verify your email address...
              </p>
            } @else if (isSuccess) {
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Email Verified!
              </h1>
              <p class="text-lg text-gray-600 leading-relaxed">
                Your email has been successfully verified. You can now access
                your account.
              </p>
            } @else if (hasError) {
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Verification Failed
              </h1>
              <p class="text-lg text-gray-600 leading-relaxed">
                {{
                  errorMessage ||
                    'We were unable to verify your email. The link may be expired or invalid.'
                }}
              </p>
            }
          } @else {
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h1>
            <p class="text-lg text-gray-600 leading-relaxed">
              We've sent a verification link to your email address. Please check
              your inbox and click the link to verify your account.
            </p>
          }
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          @if (hasToken) {
            @if (isVerifying) {
              <!-- Verifying State -->
              <div class="text-center mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
                >
                  <svg
                    class="animate-spin w-8 h-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-gray-900 mb-2">
                  Verifying your email...
                </h2>
                <p class="text-gray-600 text-sm">
                  This should only take a moment.
                </p>
              </div>
            } @else if (isSuccess) {
              <!-- Success State -->
              <div class="text-center mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
                >
                  <svg
                    class="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-gray-900 mb-2">
                  Verification Complete!
                </h2>
                <p class="text-gray-600 text-sm mb-6">
                  Your email has been successfully verified. You can now log in
                  to your account.
                </p>
              </div>

              <!-- Success Actions -->
              <div class="space-y-4">
                <a
                  routerLink="/login"
                  class="block w-full bg-gradient-to-r from-primary-600 to-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-700 transition-all duration-200 text-center"
                >
                  Continue to Login
                </a>
              </div>
            } @else if (hasError) {
              <!-- Error State -->
              <div class="text-center mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
                >
                  <svg
                    class="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-gray-900 mb-2">
                  Verification Failed
                </h2>
                <p class="text-gray-600 text-sm mb-6">
                  {{
                    errorMessage ||
                      'The verification link is invalid or has expired.'
                  }}
                </p>
              </div>

              <!-- Error Actions -->
              <div class="space-y-4">
                <button
                  (click)="resendEmail()"
                  [disabled]="isResending || countdown > 0"
                  class="w-full border border-primary-600 text-primary-600 py-3 px-4 rounded-xl hover:bg-primary-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  @if (isResending) {
                    <div class="flex items-center justify-center">
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  } @else if (countdown > 0) {
                    Resend in {{ countdown }}s
                  } @else {
                    Resend Verification Email
                  }
                </button>

                <a
                  routerLink="/login"
                  class="block w-full bg-gradient-to-r from-primary-600 to-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-700 transition-all duration-200 text-center"
                >
                  Back to Login
                </a>
              </div>
            }
          } @else {
            <!-- Default No Token State -->
            <div class="text-center mb-6">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
              >
                <svg
                  class="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 mb-2">
                Verification Email Sent!
              </h2>
              <p class="text-gray-600 text-sm mb-6">
                The verification email has been sent to your registered email
                address.
              </p>
            </div>

            <!-- Instructions -->
            <div class="space-y-4 mb-8">
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                >
                  1
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-700">
                    Check your email inbox for our verification message
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                >
                  2
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-700">
                    Click the verification link in the email
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                >
                  3
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-700">
                    Complete your account setup and start networking!
                  </p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="space-y-4">
              <button
                (click)="resendEmail()"
                [disabled]="isResending || countdown > 0"
                class="w-full border border-primary-600 text-primary-600 py-3 px-4 rounded-xl hover:bg-primary-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                @if (isResending) {
                  <div class="flex items-center justify-center">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                } @else if (countdown > 0) {
                  Resend in {{ countdown }}s
                } @else {
                  Resend Verification Email
                }
              </button>

              <a
                routerLink="/login"
                class="block w-full bg-gradient-to-r from-primary-600 to-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-700 transition-all duration-200 text-center"
              >
                Back to Login
              </a>
            </div>

            <!-- Help -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
              <p class="text-sm text-gray-500 mb-4">
                Didn't receive the email? Check your spam folder or contact
                support.
              </p>
              <a
                href="mailto:support@diucse-alumni.org"
                class="text-primary-600 hover:text-primary-800 font-medium text-sm"
              >
                Contact Support
              </a>
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2025 DIUCSE Alumni Association. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmail implements OnInit, OnDestroy {
  isResending = false;
  countdown = 0;
  private countdownInterval?: number;

  // Token verification properties
  hasToken = false;
  isVerifying = false;
  isSuccess = false;
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Check if there's a token in the URL
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.hasToken = true;
        this.verifyEmailWithToken(token);
      } else {
        this.hasToken = false;
        this.startCountdown();
      }
      this.cdr.detectChanges();
    });
  }

  private verifyEmailWithToken(token: string) {
    this.isVerifying = true;
    this.hasError = false;
    this.isSuccess = false;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.isVerifying = false;
        this.isSuccess = true;
        this.hasError = false;
        this.cdr.detectChanges();

        // Optional: redirect to login after a delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isVerifying = false;
        this.hasError = true;
        this.isSuccess = false;

        // Extract error message from response
        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage =
            'The verification link is invalid or has expired.';
        }

        this.cdr.detectChanges();
        this.startCountdown(); // Allow resend after error
      },
    });
  }

  resendEmail() {
    this.isResending = true;
    this.cdr.detectChanges();

    this.authService.resendVerificationEmail().subscribe({
      next: (response) => {
        this.isResending = false;
        this.startCountdown();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isResending = false;
        this.cdr.detectChanges();
        // Handle resend error if needed
        console.error('Failed to resend verification email:', error);
      },
    });
  }

  private startCountdown() {
    // Clear any existing interval
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdown = 60;
    // Use setTimeout to delay the first change detection until after the view is initialized
    setTimeout(() => {
      this.cdr.detectChanges();
    });

    this.countdownInterval = setInterval(() => {
      this.countdown--;
      this.cdr.detectChanges();
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = undefined;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
