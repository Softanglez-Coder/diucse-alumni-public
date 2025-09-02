import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../../../services";

@Component({
    selector: 'member-card',
    template: `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <!-- Member Photo -->
            <div class="h-48 bg-gray-200 overflow-hidden">
                <img
                    [src]="getPhotoUrl(member().photo)"
                    [alt]="member().name"
                    class="w-full h-full object-cover"
                    loading="lazy">
            </div>

            <!-- Member Info -->
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ member().name }}</h3>

                <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i class="fas fa-briefcase w-4 mr-2"></i>
                        <span class="font-medium">{{ member().currentPosition }}</span>
                    </div>

                    <div class="flex items-center">
                        <i class="fas fa-building w-4 mr-2"></i>
                        <span>{{ member().company }}</span>
                    </div>

                    <div class="flex items-center">
                        <i class="fas fa-graduation-cap w-4 mr-2"></i>
                        <span>Batch: {{ member().batch.name }}</span>
                    </div>

                    @if (showContact()) {
                        <div class="flex items-center">
                            <i class="fas fa-envelope w-4 mr-2"></i>
                            <span class="truncate">{{ member().email }}</span>
                        </div>

                        @if (member().phone) {
                            <div class="flex items-center">
                                <i class="fas fa-phone w-4 mr-2"></i>
                                <span>{{ member().phone }}</span>
                            </div>
                        }
                    }
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class MemberCard {
    member = input.required<User>();
    showContact = input<boolean>(true);

    protected getPhotoUrl(photoPath: string | null): string {
        if (!photoPath) {
            return '/images/members/default-avatar.svg';
        }
        return photoPath.startsWith('http') ? photoPath : `/images/members/${photoPath}`;
    }
}
