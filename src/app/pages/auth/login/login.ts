import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private http: HttpClient,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.loginError = null;
      this.auth.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: () => {
          this.isSubmitting = false;
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/portal';
          this.router.navigateByUrl(returnUrl);
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.loginError = err?.error?.message || 'Login failed. Please try again.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control?.errors['required']) return `${fieldName} is required`;
      if (control?.errors['email']) return 'Please enter a valid email';
      if (control?.errors['minlength']) return `${fieldName} must be at least ${control?.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
