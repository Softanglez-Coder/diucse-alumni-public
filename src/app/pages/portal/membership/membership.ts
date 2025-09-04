import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserService,
  MembershipService,
  MembershipStatus,
  Membership,
} from '../../../services';

@Component({
  selector: 'membership',
  templateUrl: './membership.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PortalMembership {
  private readonly userService = inject(UserService);
  private readonly membershipService = inject(MembershipService);

  protected currentUser = signal<any>(null);
  protected currentMembership = signal<Membership | null>(null);
  protected isSubmitting = signal(false);
  protected showConfirmDialog = signal(false);
  protected isLoading = signal(true);

  constructor() {
    this.loadCurrentUser();
    this.loadCurrentMembership();
  }

  private loadCurrentUser() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser.set(user);
        console.log('Current user:', user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
    });
  }

  private loadCurrentMembership() {
    this.membershipService.getMyMembership().subscribe({
      next: (membership) => {
        this.currentMembership.set(membership);
        console.log('Current membership:', membership);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading membership:', error);
        this.currentMembership.set(null);
        this.isLoading.set(false);
      },
    });
  }

  protected isGuest(): boolean {
    const user = this.currentUser();
    return (
      user?.roles?.includes('Guest') || user?.roles?.includes('guest') || false
    );
  }

  protected canApplyForMembership(): boolean {
    const membership = this.currentMembership();
    return (
      this.isGuest() &&
      (!membership || membership.status === MembershipStatus.Draft)
    );
  }

  protected hasActiveMembership(): boolean {
    const membership = this.currentMembership();
    return membership?.status === MembershipStatus.Approved;
  }

  protected getMembershipStatusText(): string {
    const membership = this.currentMembership();
    if (!membership) return 'No Application';

    switch (membership.status) {
      case MembershipStatus.Draft:
        return 'Draft';
      case MembershipStatus.Requested:
        return 'Under Review';
      case MembershipStatus.InProgress:
        return 'In Progress';
      case MembershipStatus.PaymentRequired:
        return 'Payment Required';
      case MembershipStatus.Approved:
        return 'Approved';
      case MembershipStatus.Rejected:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  protected getMembershipStatusBadgeClass(): string {
    const membership = this.currentMembership();
    if (!membership) return 'badge-light';

    switch (membership.status) {
      case MembershipStatus.Approved:
        return 'badge-success';
      case MembershipStatus.Requested:
      case MembershipStatus.InProgress:
        return 'badge-warning';
      case MembershipStatus.PaymentRequired:
        return 'badge-info';
      case MembershipStatus.Rejected:
        return 'badge-danger';
      case MembershipStatus.Draft:
        return 'badge-secondary';
      default:
        return 'badge-light';
    }
  }

  protected showConfirmation() {
    this.showConfirmDialog.set(true);
  }

  protected hideConfirmation() {
    this.showConfirmDialog.set(false);
  }

  protected async submitMembershipRequest() {
    if (!this.canApplyForMembership()) {
      alert('You are not eligible to apply for membership at this time.');
      return;
    }

    this.isSubmitting.set(true);

    try {
      const result = await this.membershipService
        .requestMembership()
        .toPromise();
      console.log('Membership request submitted:', result);

      // Update the current membership with the new data
      if (result) {
        this.currentMembership.set(result);
      }

      this.hideConfirmation();
      alert(
        'Membership application submitted successfully! You will receive an email confirmation shortly.',
      );
    } catch (error) {
      console.error('Error submitting membership request:', error);
      alert('Failed to submit membership application. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
