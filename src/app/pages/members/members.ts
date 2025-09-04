import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService, User } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { MemberCard } from '../../shared/components/member-card/member-card';

@Component({
  selector: 'members',
  templateUrl: './members.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserService],
  imports: [CommonModule, FormsModule, RouterModule, MemberCard],
})
export class Members {
  private userService = inject(UserService);

  // Filter signals
  protected nameFilter = signal('');
  protected emailFilter = signal('');
  protected phoneFilter = signal('');
  protected companyFilter = signal('');

  // Get all members using the members endpoint
  protected members = toSignal(this.userService.getMembers(), {
    initialValue: [],
  });

  // Computed filtered members
  protected filteredMembers = computed(() => {
    const allMembers = this.members();
    const nameFilter = this.nameFilter().toLowerCase();
    const emailFilter = this.emailFilter().toLowerCase();
    const phoneFilter = this.phoneFilter().toLowerCase();
    const companyFilter = this.companyFilter().toLowerCase();

    return allMembers.filter((member: User) => {
      const matchesName =
        !nameFilter || member.name.toLowerCase().includes(nameFilter);
      const matchesEmail =
        !emailFilter || member.email.toLowerCase().includes(emailFilter);
      const matchesPhone =
        !phoneFilter || member.phone.toLowerCase().includes(phoneFilter);
      const matchesCompany =
        !companyFilter || member.company.toLowerCase().includes(companyFilter);

      return matchesName && matchesEmail && matchesPhone && matchesCompany;
    });
  });

  protected clearFilters(): void {
    this.nameFilter.set('');
    this.emailFilter.set('');
    this.phoneFilter.set('');
    this.companyFilter.set('');
  }
}
