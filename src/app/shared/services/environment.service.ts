import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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

  getCookieAttributes(remember: boolean = false): string {
    const domain = `; domain=${this.cookieDomain}`;
    const secure = this.cookieSecure ? '; Secure' : '';
    const sameSite = '; SameSite=Lax';
    const path = '; path=/';
    
    const expires = remember
      ? `; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}` // 30 days
      : `; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`; // 1 day for session
    
    return `${path}${domain}${expires}${secure}${sameSite}`;
  }
}
