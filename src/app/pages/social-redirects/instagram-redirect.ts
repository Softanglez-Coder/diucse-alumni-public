import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instagram-redirect',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Redirecting to Instagram...</p>
      </div>
    </div>
  `,
  standalone: true,
})
export class InstagramRedirect implements OnInit {
  ngOnInit() {
    // Redirect to the actual Instagram page after a short delay
    setTimeout(() => {
      window.location.href = 'https://instagram.com/diubd';
    }, 1000);
  }
}
