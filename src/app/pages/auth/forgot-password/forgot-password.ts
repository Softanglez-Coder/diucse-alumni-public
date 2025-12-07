import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Redirect to Auth0 password reset flow
   */
  onSubmit() {
    this.isSubmitting = true;
    this.errorMessage = null;

    // Redirect to Auth0 password reset
    this.authService
      .forgotPassword(this.forgotPasswordForm.value.email || '')
      .subscribe({
        next: () => {
          // Won't be called as it redirects
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage =
            err?.error?.message ||
            'Failed to initiate password reset. Please try again.';
          this.cdr.markForCheck();
        },
      });
  }

  private markFormGroupTouched() {
    Object.keys(this.forgotPasswordForm.controls).forEach((key) => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.forgotPasswordForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control?.errors['required']) return 'Email is required';
      if (control?.errors['email']) return 'Please enter a valid email';
    }
    return '';
  }
}
