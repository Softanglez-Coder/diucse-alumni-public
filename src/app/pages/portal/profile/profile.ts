import { ChangeDetectionStrategy, Component, signal, inject, OnInit, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserService, type User } from "../../../services";
import { AuthService } from "../../../shared/services";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    currentPosition: string;
    company: string;
}

@Component({
    selector: 'profile',
    templateUrl: './profile.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, CommonModule]
})
export class PortalProfile implements OnInit {
    private readonly userService = inject(UserService);
    private readonly authService = inject(AuthService);

    protected isEditing = signal(false);
    protected isLoading = signal(true);
    protected error = signal<string | null>(null);
    protected userData = signal<User | null>(null);
    protected isSendingVerification = signal(false);

    protected profile = signal<ProfileData>({
        name: '',
        email: '',
        phone: '',
        currentPosition: '',
        company: ''
    });

    // Computed value for display name
    protected displayName = computed(() => {
        const user = this.userData();
        if (user) {
            return user.name || 'User';
        }
        return 'User';
    });

    // Computed value for batch information
    protected batchInfo = computed(() => {
        const user = this.userData();
        return user?.batch?.name || 'Not specified';
    });

    // Computed value for user roles as array for chip display
    protected userRolesArray = computed(() => {
        const user = this.userData();
        return user?.roles || ['guest'];
    });

    // Computed value for account status
    protected accountStatus = computed(() => {
        const user = this.userData();
        return {
            active: user?.active || false,
            emailVerified: user?.emailVerified || false
        };
    });

    // Computed value for profile photo
    protected profilePhoto = computed(() => {
        const user = this.userData();
        return user?.photo || null;
    });

    ngOnInit() {
        this.loadUserProfile();
    }

    private loadUserProfile() {
        this.isLoading.set(true);
        this.error.set(null);

        this.userService.getCurrentUser().subscribe({
            next: (user) => {
                this.userData.set(user);
                this.mapUserToProfile(user);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading user profile:', error);
                this.error.set('Failed to load profile. Please try again.');
                this.isLoading.set(false);
            }
        });
    }

    private mapUserToProfile(user: User) {
        this.profile.set({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            currentPosition: user.currentPosition || '',
            company: user.company || ''
        });
    }

    private mapProfileToUser(profile: ProfileData): Partial<User> {
        return {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            currentPosition: profile.currentPosition,
            company: profile.company
        };
    }

    protected toggleEdit() {
        this.isEditing.update(editing => !editing);
    }

    protected saveProfile() {
        if (this.isLoading()) return;

        this.isLoading.set(true);
        this.error.set(null);

        const profileData = this.profile();
        const updateData = this.mapProfileToUser(profileData);

        this.userService.updateCurrentUser(updateData).subscribe({
            next: (updatedUser) => {
                this.userData.set(updatedUser);
                this.mapUserToProfile(updatedUser);
                this.isEditing.set(false);
                this.isLoading.set(false);
                console.log('Profile updated successfully');
                // You could add a toast notification here
            },
            error: (error) => {
                console.error('Error updating profile:', error);
                this.error.set('Failed to save profile. Please try again.');
                this.isLoading.set(false);
            }
        });
    }

    protected cancelEdit() {
        // Reset profile to original user data
        const user = this.userData();
        if (user) {
            this.mapUserToProfile(user);
        }
        this.isEditing.set(false);
        this.error.set(null);
    }

    protected retryLoad() {
        this.loadUserProfile();
    }

    protected sendVerificationEmail() {
        if (this.isSendingVerification()) return;

        const user = this.userData();
        if (!user?.email) return;

        this.isSendingVerification.set(true);
        this.error.set(null);

        this.authService.resendVerificationEmail().subscribe({
            next: () => {
                console.log('Verification email sent successfully');
                this.isSendingVerification.set(false);
                // You could add a success toast notification here
            },
            error: (error) => {
                console.error('Error sending verification email:', error);
                this.error.set('Failed to send verification email. Please try again.');
                this.isSendingVerification.set(false);
            }
        });
    }
}
