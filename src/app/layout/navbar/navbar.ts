import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Link } from '../../shared';
import { AuthService } from '../../shared/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected isMobileMenuOpen = signal(false);

  protected linksRequest = httpResource<Array<Link>>(
    () => '/data/nav-links.json',
    {
      defaultValue: [],
    },
  );

  get isAuthenticated() {
    return this.authService.isAuthenticated$;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.closeMobileMenu();
        this.router.navigate(['/']);
      },
      error: () => {
        // Clear token locally even if backend call fails
        this.closeMobileMenu();
        this.router.navigate(['/']);
      },
    });
  }
}
