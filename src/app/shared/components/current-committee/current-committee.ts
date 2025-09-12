import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommitteeService, CommitteeMember } from '../../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, of } from 'rxjs';

@Component({
  selector: 'current-committee',
  templateUrl: './current-committee.html',
  styleUrls: ['./current-committee.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommitteeService],
  imports: [CommonModule, RouterModule],
})
export class CurrentCommittee {
  private committeeService = inject(CommitteeService);

  // Get current committee
  protected currentCommittee = toSignal(
    this.committeeService.getCurrentCommittee()
  );

  // Get current committee members
  protected currentCommitteeMembers = toSignal(
    this.committeeService.getCurrentCommittee().pipe(
      switchMap(committee => {
        if (committee?._id) {
          return this.committeeService.getCommitteeMembers(committee._id);
        }
        return of([]);
      })
    ),
    { initialValue: [] as CommitteeMember[] }
  );

  // Computed values
  protected hasCurrentCommittee = computed(() => !!this.currentCommittee());
  protected hasMembers = computed(() => (this.currentCommitteeMembers()?.length ?? 0) > 0);

  // Display only first 8 members for homepage
  protected displayMembers = computed(() => 
    this.currentCommitteeMembers()?.slice(0, 8) || []
  );

  protected totalMembers = computed(() => this.currentCommitteeMembers()?.length || 0);
  protected remainingMembers = computed(() => Math.max(0, this.totalMembers() - 8));

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

  protected formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }
}
