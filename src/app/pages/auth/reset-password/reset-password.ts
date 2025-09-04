import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-600 rounded-xl mb-4 shadow-lg"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              ></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p class="text-gray-600">
            Create a new secure password for your account
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          @if (success) {
            <div class="text-center">
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
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                Password Reset Successfully!
              </h2>
              <p class="text-gray-600 mb-6">
                Your password has been updated. You will be redirected to the
                login page in a few seconds.
              </p>
              <a
                routerLink="/login"
                class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                Go to Login
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
          } @else {
            @if (error) {
              <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-800">{{ error }}</p>
                  </div>
                </div>
              </div>
            }

            <form
              [formGroup]="resetForm"
              (ngSubmit)="onSubmit()"
              class="space-y-6"
            >
              <div>
                <label
                  for="password"
                  class="block text-sm font-semibold text-gray-700 mb-2"
                  >New Password</label
                >
                <div class="relative">
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    id="password"
                    formControlName="password"
                    placeholder="Enter new password"
                    class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    [class.border-red-300]="getFieldError('password')"
                  />
                  <button
                    type="button"
                    (click)="togglePassword()"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <svg
                      *ngIf="!showPassword"
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    <svg
                      *ngIf="showPassword"
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      ></path>
                    </svg>
                  </button>
                </div>
                @if (getFieldError('password')) {
                  <p class="mt-2 text-sm text-red-600">
                    {{ getFieldError('password') }}
                  </p>
                }
              </div>

              <div>
                <label
                  for="confirmPassword"
                  class="block text-sm font-semibold text-gray-700 mb-2"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  placeholder="Confirm new password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  [class.border-red-300]="getFieldError('confirmPassword')"
                />
                @if (getFieldError('confirmPassword')) {
                  <p class="mt-2 text-sm text-red-600">
                    {{ getFieldError('confirmPassword') }}
                  </p>
                }
              </div>

              <button
                type="submit"
                [disabled]="isSubmitting || !token"
                class="w-full bg-gradient-to-r from-primary-600 to-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                @if (isSubmitting) {
                  <div class="flex items-center justify-center">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Resetting Password...
                  </div>
                } @else {
                  Reset Password
                }
              </button>
            </form>

            <div class="mt-6 text-center">
              <a
                routerLink="/login"
                class="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Back to login
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword implements OnInit {
  resetForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  token: string | null = null;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  ngOnInit() {
    // Extract token from query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.error = 'Invalid reset token. Please request a new password reset.';
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword?.value
    ) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword?.errors['passwordMismatch'];
      if (Object.keys(confirmPassword?.errors).length === 0) {
        confirmPassword?.setErrors(null);
      }
    }
    return null;
  }

  onSubmit() {
    if (!this.token) {
      this.error = 'Invalid reset token. Please request a new password reset.';
      return;
    }

    if (this.resetForm.valid) {
      this.isSubmitting = true;
      this.error = null;

      const password = this.resetForm.value.password;

      this.authService.resetPassword(this.token, password).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.success = true;
          // Auto-redirect after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.error =
            error.error?.message ||
            'Failed to reset password. Please try again.';
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched() {
    Object.keys(this.resetForm.controls).forEach((key) => {
      const control = this.resetForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.resetForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control?.errors['required']) return `${fieldName} is required`;
      if (control?.errors['minlength'])
        return 'Password must be at least 8 characters';
      if (control?.errors['passwordMismatch']) return 'Passwords do not match';
    }
    return '';
  }
}
