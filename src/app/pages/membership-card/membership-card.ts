import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserService, User } from '../../services';

@Component({
  selector: 'app-membership-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-card.html',
  styleUrls: ['./membership-card.scss'],
})
export class MembershipCard implements OnInit {
  @ViewChild('membershipCard', { static: false }) membershipCard!: ElementRef;

  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  membershipId: string = '';
  user: User | null = null;
  isValidMembership: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  // Dummy data for invalid membership
  dummyUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    photo: null,
    membershipId: '000000',
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.membershipId = params.get('membershipId') || '';
      if (this.membershipId) {
        this.loadMembershipData();
      }
    });
  }

  loadMembershipData(): void {
    this.isLoading = true;
    this.userService
      .getUserByMembershipId(this.membershipId)
      .pipe(
        catchError((error) => {
          console.error('Error fetching user:', error);
          return of(null);
        })
      )
      .subscribe((user) => {
        this.isLoading = false;
        if (user) {
          this.user = user;
          this.isValidMembership = true;
        } else {
          this.isValidMembership = false;
          this.errorMessage = 'This membership ID is not valid. Please apply for membership.';
        }
      });
  }

  async downloadCard(format: 'png' | 'pdf'): Promise<void> {
    if (!this.isValidMembership) {
      return;
    }

    try {
      const cardElement = this.membershipCard.nativeElement;
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      if (format === 'png') {
        // Download as PNG
        const link = document.createElement('a');
        link.download = `membership-card-${this.membershipId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else if (format === 'pdf') {
        // Download as PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`membership-card-${this.membershipId}.pdf`);
      }
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Failed to generate membership card. Please try again.');
    }
  }

  getDisplayData() {
    if (this.isValidMembership && this.user) {
      return {
        name: this.user.name || 'N/A',
        email: this.user.email || 'N/A',
        photo: this.user.photo,
        membershipId: this.user.membershipId || this.membershipId,
      };
    } else {
      return {
        ...this.dummyUser,
        membershipId: this.membershipId,
      };
    }
  }

  getPhotoUrl(photo: string | null): string {
    if (!photo) {
      return 'https://via.placeholder.com/150?text=No+Photo';
    }
    return photo;
  }
}
