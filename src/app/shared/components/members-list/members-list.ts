import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../services';
import { MemberCard } from '../member-card/member-card';

@Component({
  selector: 'members-list',
  template: `
    <div class="py-8">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ title() }}</h2>
            <p class="text-gray-600">{{ subtitle() }}</p>
          </div>

          @if (showViewAllLink()) {
            <a
              routerLink="/members"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Members
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          }
        </div>

        <!-- Members Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          @for (member of members(); track member.id) {
            <member-card [member]="member" [showContact]="showContact()">
            </member-card>

          } @empty {
            <div class="col-span-full text-center py-12">
              <div class="text-gray-500">
                <i class="fas fa-users text-4xl mb-4"></i>
                <p class="text-xl">{{ emptyMessage() }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MemberCard],
})
export class MembersList {
  members = input.required<User[]>();
  title = input<string>('Our Members');
  subtitle = input<string>('Meet our amazing alumni community');
  showViewAllLink = input<boolean>(false);
  showContact = input<boolean>(false);
  emptyMessage = input<string>('No members to display at the moment.');
}
