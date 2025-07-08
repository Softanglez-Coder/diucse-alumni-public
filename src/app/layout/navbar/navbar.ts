import { httpResource } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Link } from "../../shared";
import { AuthService } from "../../shared/services";
import { CommonModule } from "@angular/common";

@Component({
    selector: '[navbar]',
    templateUrl: './navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        RouterLinkActive,
        CommonModule
    ]
})
export class Navbar {
    private authService = inject(AuthService);
    private router = inject(Router);
    
    protected linksRequest = httpResource<Array<Link>>(() => '/data/nav-links.json', {
        defaultValue: []
    });

    get isAuthenticated() {
        return this.authService.isAuthenticated$;
    }

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: () => {
                // Clear token locally even if backend call fails
                this.router.navigate(['/']);
            }
        });
    }
}