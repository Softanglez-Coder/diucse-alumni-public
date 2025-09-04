import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'facebook-redirect',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Redirecting to Facebook...</p>
      </div>
    </div>
  `,
  standalone: true,
})
export class FacebookRedirect implements OnInit {
  ngOnInit() {
    // Redirect to the actual Facebook page after a short delay
    setTimeout(() => {
      window.location.href = 'https://facebook.com/diubd';
    }, 1000);
  }
}
