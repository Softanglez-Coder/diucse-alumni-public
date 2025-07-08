import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Check Your Email</h1>
          <p class="text-lg text-gray-600 leading-relaxed">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <!-- Success Icon -->
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Verification Email Sent!</h2>
            <p class="text-gray-600 text-sm mb-6">
              The verification email has been sent to your registered email address.
            </p>
          </div>

          <!-- Instructions -->
          <div class="space-y-4 mb-8">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                1
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-700">Check your email inbox for our verification message</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                2
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-700">Click the verification link in the email</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                3
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-700">Complete your account setup and start networking!</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-4">
            <button
              (click)="resendEmail()"
              [disabled]="isResending || countdown > 0"
              class="w-full border border-emerald-600 text-emerald-600 py-3 px-4 rounded-xl hover:bg-emerald-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              @if (isResending) {
                <div class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
              class="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 text-center"
            >
              Back to Login
            </a>
          </div>

          <!-- Help -->
          <div class="mt-8 pt-6 border-t border-gray-200 text-center">
            <p class="text-sm text-gray-500 mb-4">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
            <a href="mailto:support@diucse-alumni.org" class="text-emerald-600 hover:text-emerald-800 font-medium text-sm">
              Contact Support
            </a>
          </div>
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
export class VerifyEmail {
  isResending = false;
  countdown = 0;

  constructor(private router: Router) {
    this.startCountdown();
  }

  resendEmail() {
    this.isResending = true;
    // Simulate API call
    setTimeout(() => {
      this.isResending = false;
      this.startCountdown();
    }, 2000);
  }

  private startCountdown() {
    this.countdown = 60;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
