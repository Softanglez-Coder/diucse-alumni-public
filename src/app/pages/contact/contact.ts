import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <section
        class="bg-gradient-to-r from-primary-600 to-primary-600 text-white py-20"
      >
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold mb-4">Get In Touch</h1>
          <p class="text-xl text-primary-100">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      <div class="container mx-auto px-4 py-16">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-16">
            <!-- Contact Form -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              <form
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                class="space-y-6"
              >
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2"
                      >First Name</label
                    >
                    <input
                      type="text"
                      formControlName="firstName"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2"
                      >Last Name</label
                    >
                    <input
                      type="text"
                      formControlName="lastName"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2"
                    >Email</label
                  >
                  <input
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2"
                    >Subject</label
                  >
                  <select
                    formControlName="subject"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="membership">Membership</option>
                    <option value="events">Events</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2"
                    >Message</label
                  >
                  <textarea
                    formControlName="message"
                    rows="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  [disabled]="isSubmitting"
                  class="w-full bg-gradient-to-r from-primary-600 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-700 transition-all duration-200 disabled:opacity-50"
                >
                  @if (isSubmitting) {
                    <div class="flex items-center justify-center">
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5"
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
                  } @else {
                    Send Message
                  }
                </button>
              </form>
            </div>

            <!-- Contact Info -->
            <div class="space-y-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p class="text-gray-600 text-lg leading-relaxed mb-8">
                  Have questions? We're here to help. Reach out to us through
                  any of the following channels.
                </p>
              </div>

              <div class="space-y-6">
                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-semibold text-gray-900">Address</h3>
                    <p class="text-gray-600">Satarkul Rd, Dhaka 1212</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-semibold text-gray-900">Email</h3>
                    <p class="text-gray-600">support&#64;csediualumni.com</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-semibold text-gray-900">
                      Office Hours
                    </h3>
                    <p class="text-gray-600">
                      24/7 - We're always here to help!
                    </p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="pt-8 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div class="flex space-x-4">
                  <a
                    routerLink="/twitter"
                    class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  </a>
                  <a
                    routerLink="/linkedin"
                    class="w-10 h-10 bg-primary-800 text-white rounded-lg flex items-center justify-center hover:bg-primary-900 transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </a>
                  <a
                    routerLink="/facebook"
                    class="w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      const formData = this.contactForm.value;

      // Create email content
      const to = 'support@csediualumni.com';
      const subject = encodeURIComponent(
        `Contact Form: ${formData.subject || 'General Inquiry'}`,
      );
      const body = encodeURIComponent(
        `Hello,\n\n` +
          `Name: ${formData.firstName} ${formData.lastName}\n` +
          `Email: ${formData.email}\n` +
          `Subject: ${formData.subject}\n\n` +
          `Message:\n${formData.message}\n\n` +
          `--\n` +
          `This message was sent from the DIUCSE Alumni contact form.`,
      );

      // Create mailto URL
      const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;

      // Open default mail app
      window.location.href = mailtoUrl;

      // Reset form after a short delay
      setTimeout(() => {
        this.isSubmitting = false;
        this.contactForm.reset();
        alert(
          'Your default mail application should open with the pre-filled email. Please send it to complete your inquiry.',
        );
      }, 1000);
    }
  }
}
