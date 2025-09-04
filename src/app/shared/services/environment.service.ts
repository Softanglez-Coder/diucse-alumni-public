import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get isProduction(): boolean {
    return window.location.hostname.includes('csediualumni.com');
  }

  get isDevelopment(): boolean {
    return !this.isProduction;
  }

  get apiUrl(): string {
    if (this.isProduction) {
      return 'https://api.csediualumni.com';
    }
    return 'http://localhost:3000';
  }

  get appUrl(): string {
    if (this.isProduction) {
      return 'https://csediualumni.com';
    }
    return 'http://localhost:4200';
  }

  get adminUrl(): string {
    if (this.isProduction) {
      return 'https://admin.csediualumni.com';
    }
    return 'http://localhost:4300';
  }

  get cookieDomain(): string {
    if (this.isProduction) {
      return '.csediualumni.com'; // This allows sharing cookies across subdomains
    }
    return 'localhost';
  }

  get cookieSecure(): boolean {
    return this.isProduction;
  }
}
