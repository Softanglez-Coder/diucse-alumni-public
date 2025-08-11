import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { UserService, User } from "../../services";
import { toSignal } from "@angular/core/rxjs-interop";
import { switchMap, map, catchError, of } from "rxjs";

@Component({
    selector: 'member-details',
    templateUrl: './member-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserService],
    imports: [CommonModule, RouterModule]
})
export class MemberDetails {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserService);

    protected loading = signal(true);
    protected error = signal<string | null>(null);

    // Get member ID from route
    private memberId = toSignal(
        this.route.paramMap.pipe(
            map(params => params.get('id'))
        ),
        { initialValue: null }
    );

    // Get current user to check roles
    protected currentUser = toSignal(
        this.userService.getCurrentUser().pipe(
            catchError(() => of(null))
        ),
        { initialValue: null }
    );

    // Get member details
    protected member = toSignal(
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                if (!id) {
                    this.error.set('Member ID not found');
                    return of(null);
                }

                this.loading.set(true);
                this.error.set(null);

                return this.userService.getMemberById(id).pipe(
                    map(member => {
                        this.loading.set(false);
                        return member;
                    }),
                    catchError(err => {
                        console.error('Error loading member:', err);
                        if (err.status === 404) {
                            this.error.set('Member not found');
                        } else {
                            this.error.set('Failed to load member details');
                        }
                        this.loading.set(false);
                        return of(null);
                    })
                );
            })
        ),
        { initialValue: null }
    );

    // Check if current user has 'member' role
    protected canViewSensitiveInfo = computed(() => {
        const user = this.currentUser();
        return user && user.roles && user.roles.includes('member');
    });

    protected getPhotoUrl(photoPath: string | null): string {
        if (!photoPath) {
            return '/images/members/default-avatar.svg';
        }
        return photoPath.startsWith('http') ? photoPath : `/images/members/${photoPath}`;
    }

    protected goBack(): void {
        this.router.navigate(['/members']);
    }

    protected sendEmail(email: string): void {
        window.open(`mailto:${email}`, '_blank');
    }

    protected callPhone(phone: string): void {
        window.open(`tel:${phone}`, '_blank');
    }
}
