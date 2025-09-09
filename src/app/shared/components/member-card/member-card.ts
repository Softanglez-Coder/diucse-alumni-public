import { ChangeDetectionStrategy, Component, input, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { User, UserService } from "../../../services";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";

@Component({
    selector: 'member-card',
    template: `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-transparent hover:border-blue-100"
             [routerLink]="['/members', member().id || member()._id]">
            <!-- Member Photo -->
            <div class="h-48 bg-gray-200 overflow-hidden relative">
                <img
                    [src]="getPhotoUrl(member().photo)"
                    [alt]="member().name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <!-- Member Info -->
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {{ member().name }}
                </h3>

                <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i class="fas fa-briefcase w-4 mr-2 text-blue-600"></i>
                        <span class="font-medium">{{ member().currentPosition }}</span>
                    </div>

                    <div class="flex items-center">
                        <i class="fas fa-building w-4 mr-2 text-blue-600"></i>
                        <span>{{ member().company }}</span>
                    </div>

                    <div class="flex items-center">
                        <i class="fas fa-graduation-cap w-4 mr-2 text-blue-600"></i>
                        <span>Batch: {{ member().batch.name }}</span>
                    </div>

                    @if (showContact() && canViewSensitiveInfo()) {
                        <div class="flex items-center">
                            <i class="fas fa-envelope w-4 mr-2 text-blue-600"></i>
                            <span class="truncate">{{ member().email }}</span>
                        </div>

                        @if (member().phone) {
                            <div class="flex items-center">
                                <i class="fas fa-phone w-4 mr-2 text-blue-600"></i>
                                <span>{{ member().phone }}</span>
                            </div>
                        }
                    } @else if (showContact() && !canViewSensitiveInfo()) {
                        <div class="flex items-center text-gray-400">
                            <i class="fas fa-lock w-4 mr-2"></i>
                            <span class="text-xs">Contact info restricted</span>
                        </div>
                    }
                </div>

                <!-- View Details Button -->
                <div class="mt-4 pt-3 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-500">
                            Member since {{ member().createdAt | date:'MMM yyyy' }}
                        </span>
                        <span class="text-blue-600 text-sm font-medium flex items-center group-hover:text-blue-700">
                            View Details
                            <i class="fas fa-arrow-right ml-1 transition-transform duration-200 group-hover:translate-x-1"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule],
    host: {
        'class': 'group'
    }
})
export class MemberCard {
    private userService = inject(UserService);

    member = input.required<User>();
    showContact = input<boolean>(true);

    // Get current user to check roles
    protected currentUser = toSignal(
        this.userService.getCurrentUser().pipe(
            catchError(() => of(null))
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
}