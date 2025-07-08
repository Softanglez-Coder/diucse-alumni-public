import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  currentStep = 1;
  totalSteps = 3;

  Math = Math;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      
      // Academic Information
      studentId: ['', [Validators.required]],
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
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
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
    const step1Fields = ['firstName', 'lastName', 'email', 'phone'];
    const step2Fields = ['studentId', 'batch', 'graduationYear', 'degree'];
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
    const step1Fields = ['firstName', 'lastName', 'email', 'phone'];
    const step2Fields = ['studentId', 'batch', 'graduationYear', 'degree'];
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
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/verify-email']);
      }, 2000);
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
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (control.errors['email']) return 'Please enter a valid email';
      if (control.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['pattern']) return 'Please enter a valid phone number (11 digits)';
      if (control.errors['min']) return `Graduation year must be at least ${control.errors['min'].min}`;
      if (control.errors['max']) return `Graduation year cannot exceed ${control.errors['max'].max}`;
      if (control.errors['passwordMismatch']) return 'Passwords do not match';
      if (control.errors['requiredTrue']) return 'You must accept the terms and conditions';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      studentId: 'Student ID',
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
