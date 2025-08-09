import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services';
import { BatchService } from '../../../services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [BatchService],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  currentStep: number = 1;
  totalSteps: number = 3;
  registrationError: string | null = null;

  Math = Math;

  // Batch data from API
  batches: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private batchService: BatchService,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize batches data from API
    this.batches = this.batchService.findAll();
    this.registerForm = this.fb.group({
      // Personal Information
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],

      // Academic Information
      batch: ['', [Validators.required]],
      graduationYear: ['', [Validators.required, Validators.min(2010), Validators.max(new Date().getFullYear())]],
      degree: ['BSc in Computer Science and Engineering', [Validators.required]],

      // Professional Information
      currentPosition: [''],
      company: [''],
      experience: [''],
      location: [''],

      // Account Security
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      newsletter: [true]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword?.errors['passwordMismatch'];
      if (Object.keys(confirmPassword?.errors).length === 0) {
        confirmPassword?.setErrors(null);
      }
    }
    return null;
  }

  nextStep() {
    if (this.isStepValid()) {
      this.currentStep++;
    } else {
      this.markStepGroupTouched();
    }
  }

  prevStep() {
    this.currentStep--;
  }

  isStepValid(): boolean {
    const step1Fields = ['name', 'email', 'phone'];
    const step2Fields = ['batch', 'graduationYear', 'degree'];
    const step3Fields = ['password', 'confirmPassword', 'acceptTerms'];

    let fieldsToCheck: string[] = [];

    switch (this.currentStep) {
      case 1:
        fieldsToCheck = step1Fields;
        break;
      case 2:
        fieldsToCheck = step2Fields;
        break;
      case 3:
        fieldsToCheck = step3Fields;
        break;
    }

    return fieldsToCheck.every(field => {
      const control = this.registerForm.get(field);
      return control?.valid;
    });
  }

  markStepGroupTouched() {
    const step1Fields = ['name', 'email', 'phone'];
    const step2Fields = ['batch', 'graduationYear', 'degree'];
    const step3Fields = ['password', 'confirmPassword', 'acceptTerms'];

    let fieldsToMark: string[] = [];

    switch (this.currentStep) {
      case 1:
        fieldsToMark = step1Fields;
        break;
      case 2:
        fieldsToMark = step2Fields;
        break;
      case 3:
        fieldsToMark = step3Fields;
        break;
    }

    fieldsToMark.forEach(field => {
      this.registerForm.get(field)?.markAsTouched();
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.registrationError = null;

      const formData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        batch: this.registerForm.value.batch,
        graduationYear: this.registerForm.value.graduationYear,
        degree: this.registerForm.value.degree,
        currentPosition: this.registerForm.value.currentPosition,
        company: this.registerForm.value.company,
        experience: this.registerForm.value.experience,
        location: this.registerForm.value.location,
        password: this.registerForm.value.password,
        newsletter: this.registerForm.value.newsletter
      };

      this.authService.register(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/verify-email'], {
            queryParams: { email: this.registerForm.value.email }
          });
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.registrationError = err?.error?.message || 'Registration failed. Please try again.';
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

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control?.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (control?.errors['email']) return 'Please enter a valid email';
      if (control?.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${control?.errors['minlength'].requiredLength} characters`;
      if (control?.errors['pattern']) return 'Please enter a valid phone number (11 digits)';
      if (control?.errors['min']) return `Graduation year must be at least ${control?.errors['min'].min}`;
      if (control?.errors['max']) return `Graduation year cannot exceed ${control?.errors['max'].max}`;
      if (control?.errors['passwordMismatch']) return 'Passwords do not match';
      if (control?.errors['requiredTrue']) return 'You must accept the terms and conditions';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone number',
      batch: 'Batch',
      graduationYear: 'Graduation year',
      degree: 'Degree',
      password: 'Password',
      confirmPassword: 'Confirm password'
    };
    return labels[fieldName] || fieldName;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
