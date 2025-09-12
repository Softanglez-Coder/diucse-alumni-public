import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommitteeService, Committee } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'committees',
  templateUrl: './committees.html',
  styleUrls: ['./committees.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommitteeService],
  imports: [CommonModule, RouterModule],
})
export class Committees {
  private committeeService = inject(CommitteeService);

  // Signals for different committee states
  protected currentCommittee = toSignal(this.committeeService.getCurrentCommittee());

  protected previousCommittees = toSignal(this.committeeService.getPreviousCommittees(), {
    initialValue: [] as Committee[],
  });

  protected upcomingCommittees = toSignal(this.committeeService.getUpcomingCommittees(), {
    initialValue: [] as Committee[],
  });

  protected selectedTab = signal<'current' | 'previous' | 'upcoming'>('current');

  // Computed values for display
  protected hasCurrentCommittee = computed(() => !!this.currentCommittee());
  protected hasPreviousCommittees = computed(() => this.previousCommittees().length > 0);
  protected hasUpcomingCommittees = computed(() => this.upcomingCommittees().length > 0);

  protected selectTab(tab: 'current' | 'previous' | 'upcoming') {
    this.selectedTab.set(tab);
  }

  protected formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  protected getCommitteeDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    
    if (startYear === endYear) {
      return `${startYear}`;
    }
    return `${startYear} - ${endYear}`;
  }

  protected getCommitteeStatus(committee: Committee): 'current' | 'upcoming' | 'previous' {
    const now = new Date();
    const startDate = new Date(committee.startDate);
    const endDate = new Date(committee.endDate);
    
    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'previous';
    return 'current';
  }

  protected getStatusBadgeClass(committee: Committee): string {
    const status = this.getCommitteeStatus(committee);
    
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'previous':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
