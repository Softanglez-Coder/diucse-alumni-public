import { Component, OnInit, inject, ViewChild, ElementRef, ChangeDetectorRef, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of, timeout } from 'rxjs';
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
  private readonly cdr = inject(ChangeDetectorRef);

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
      } else {
        this.isLoading = false;
        this.isValidMembership = false;
        this.errorMessage = 'No membership ID provided.';
      }
    });
  }

  loadMembershipData(): void {
    this.isLoading = true;
    this.cdr.markForCheck();
    console.log('Fetching membership data for:', this.membershipId);
    
    this.userService
      .getUserByMembershipId(this.membershipId)
      .pipe(
        timeout(10000), // 10 second timeout
        catchError((error) => {
          console.error('Error fetching user:', error);
          console.error('Error details:', error.status, error.message);
          this.isLoading = false;
          this.cdr.markForCheck();
          
          if (error.name === 'TimeoutError') {
            this.errorMessage = 'Request timeout. Please check your connection and try again.';
          } else if (error.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please check if the API is running.';
          } else {
            this.errorMessage = 'This membership ID is not valid. Please apply for membership.';
          }
          
          return of(null);
        })
      )
      .subscribe({
        next: (user) => {
          console.log('Received user data:', user);
          this.isLoading = false;
          if (user) {
            this.user = user;
            this.isValidMembership = true;
          } else {
            this.isValidMembership = false;
            if (!this.errorMessage) {
              this.errorMessage = 'This membership ID is not valid. Please apply for membership.';
            }
          }
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Subscribe error:', error);
          this.isLoading = false;
          this.isValidMembership = false;
          this.errorMessage = 'Error loading membership data. Please try again.';
          this.cdr.markForCheck();
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
