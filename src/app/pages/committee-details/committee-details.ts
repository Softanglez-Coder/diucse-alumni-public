import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommitteeService, Committee, CommitteeMember } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'committee-details',
  templateUrl: './committee-details.html',
  styleUrls: ['./committee-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommitteeService],
  imports: [CommonModule, RouterModule],
})
export class CommitteeDetails {
  private committeeService = inject(CommitteeService);

  // Input from route parameter
  protected id = input.required<string>();

  // Get committee details and members
  protected committee = this.committeeService.findOne(this.id());

  protected committeeMembers = toSignal(
    this.committeeService.getCommitteeMembers(this.id())
  );

  // Computed values
  protected isLoading = computed(() => this.committee.isLoading() || !this.committeeMembers());
  protected hasMembers = computed(() => (this.committeeMembers()?.length ?? 0) > 0);

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

  protected getStatusText(committee: Committee): string {
    const status = this.getCommitteeStatus(committee);
    
    switch (status) {
      case 'current':
        return 'Currently Active';
      case 'upcoming':
        return 'Upcoming';
      case 'previous':
        return 'Completed';
      default:
        return 'Unknown';
    }
  }

  protected getMemberPhotoUrl(photo: string | null): string {
    if (!photo) {
      return '/images/members/default-avatar.svg';
    }
    
    // If it's already a full URL, return as is
    if (photo.startsWith('http://') || photo.startsWith('https://')) {
      return photo;
    }
    
    // Otherwise, construct the full URL
    return `/images/members/${photo}`;
  }

  // Group members by designation for better organization
  protected groupedMembers = computed(() => {
    const members = this.committeeMembers() || [];
    const grouped: { [key: string]: CommitteeMember[] } = {};
    
    members.forEach(member => {
      const designationName = member.designation?.name || 'Unassigned';
      if (!grouped[designationName]) {
        grouped[designationName] = [];
      }
      grouped[designationName].push(member);
    });
    
    // Sort by designation order if available
    const sortedGroups: { designation: string; members: CommitteeMember[] }[] = [];
    Object.keys(grouped).forEach(designation => {
      sortedGroups.push({
        designation,
        members: grouped[designation].sort((a, b) => {
          const orderA = a.designation?.order ?? 999;
          const orderB = b.designation?.order ?? 999;
          return orderA - orderB;
        })
      });
    });
    
    return sortedGroups.sort((a, b) => {
      const orderA = a.members[0]?.designation?.order ?? 999;
      const orderB = b.members[0]?.designation?.order ?? 999;
      return orderA - orderB;
    });
  });
}
