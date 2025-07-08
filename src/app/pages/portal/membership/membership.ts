import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

interface MembershipStatus {
    status: 'none' | 'pending' | 'approved' | 'rejected' | 'expired';
    applicationDate?: string;
    approvalDate?: string;
    expiryDate?: string;
    membershipId?: string;
    membershipType?: 'regular' | 'lifetime' | 'honorary';
}

interface MembershipApplication {
    fullName: string;
    email: string;
    phone: string;
    graduationYear: number;
    studentId: string;
    degree: string;
    department: string;
    currentPosition: string;
    company: string;
    workExperience: number;
    linkedinProfile: string;
    statement: string;
    membershipType: 'regular' | 'lifetime';
    agreeToTerms: boolean;
}

interface MembershipRequirement {
    title: string;
    description: string;
    icon: string;
    required: boolean;
}

@Component({
    selector: 'membership',
    templateUrl: './membership.html',
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, CommonModule]
})
export class PortalMembership {
    protected activeTab = signal<'status' | 'apply' | 'requirements'>('status');
    
    // Mock membership status - in real app this would come from backend
    protected membershipStatus = signal<MembershipStatus>({
        status: 'none' // Change to 'pending', 'approved', 'rejected', or 'expired' to test different states
    });

    protected application = signal<MembershipApplication>({
        fullName: '',
        email: '',
        phone: '',
        graduationYear: new Date().getFullYear(),
        studentId: '',
        degree: '',
        department: 'Computer Science & Engineering',
        currentPosition: '',
        company: '',
        workExperience: 0,
        linkedinProfile: '',
        statement: '',
        membershipType: 'regular',
        agreeToTerms: false
    });

    protected isSubmitting = signal(false);

    protected requirements: MembershipRequirement[] = [
        {
            title: 'Graduate of DIUCSE',
            description: 'Must be a graduate of Daffodil International University, Computer Science & Engineering department',
            icon: 'fa-graduation-cap',
            required: true
        },
        {
            title: 'Valid Student ID',
            description: 'Provide your valid student ID number for verification',
            icon: 'fa-id-card',
            required: true
        },
        {
            title: 'Professional Experience',
            description: 'At least 1 year of professional work experience (recommended)',
            icon: 'fa-briefcase',
            required: false
        },
        {
            title: 'LinkedIn Profile',
            description: 'Active LinkedIn profile showcasing your professional journey',
            icon: 'fa-linkedin',
            required: false
        },
        {
            title: 'Statement of Purpose',
            description: 'A brief statement about your goals and how you plan to contribute to the alumni community',
            icon: 'fa-file-text',
            required: true
        },
        {
            title: 'Contact Information',
            description: 'Valid email address and phone number for communication',
            icon: 'fa-phone',
            required: true
        }
    ];

    protected membershipBenefits = [
        {
            title: 'Networking Opportunities',
            description: 'Connect with fellow alumni across various industries and locations',
            icon: 'fa-users'
        },
        {
            title: 'Career Support',
            description: 'Access to job postings, career guidance, and mentorship programs',
            icon: 'fa-chart-line'
        },
        {
            title: 'Alumni Events',
            description: 'Exclusive access to alumni meetups, workshops, and annual gatherings',
            icon: 'fa-calendar-alt'
        },
        {
            title: 'Professional Development',
            description: 'Workshops, seminars, and skill development programs',
            icon: 'fa-lightbulb'
        },
        {
            title: 'Alumni Directory',
            description: 'Access to searchable alumni directory and contact information',
            icon: 'fa-address-book'
        },
        {
            title: 'News & Updates',
            description: 'Stay updated with university news, achievements, and alumni success stories',
            icon: 'fa-newspaper'
        }
    ];

    protected setActiveTab(tab: 'status' | 'apply' | 'requirements') {
        this.activeTab.set(tab);
    }

    protected getStatusBadgeClass(status: string): string {
        switch (status) {
            case 'approved': return 'badge-success';
            case 'pending': return 'badge-warning';
            case 'rejected': return 'badge-danger';
            case 'expired': return 'badge-secondary';
            default: return 'badge-light';
        }
    }

    protected getStatusText(status: string): string {
        switch (status) {
            case 'approved': return 'Approved';
            case 'pending': return 'Under Review';
            case 'rejected': return 'Rejected';
            case 'expired': return 'Expired';
            default: return 'No Application';
        }
    }

    protected canApply(): boolean {
        const status = this.membershipStatus().status;
        return status === 'none' || status === 'rejected' || status === 'expired';
    }

    protected validateApplication(): boolean {
        const app = this.application();
        return !!(
            app.fullName.trim() &&
            app.email.trim() &&
            app.phone.trim() &&
            app.graduationYear > 1995 &&
            app.studentId.trim() &&
            app.degree.trim() &&
            app.department.trim() &&
            app.statement.trim().length >= 50 &&
            app.agreeToTerms
        );
    }

    protected async submitApplication() {
        if (!this.validateApplication()) {
            alert('Please fill in all required fields');
            return;
        }

        this.isSubmitting.set(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Update membership status to pending
            this.membershipStatus.set({
                status: 'pending',
                applicationDate: new Date().toISOString().split('T')[0],
                membershipType: this.application().membershipType
            });

            // Reset form
            this.application.set({
                fullName: '',
                email: '',
                phone: '',
                graduationYear: new Date().getFullYear(),
                studentId: '',
                degree: '',
                department: 'Computer Science & Engineering',
                currentPosition: '',
                company: '',
                workExperience: 0,
                linkedinProfile: '',
                statement: '',
                membershipType: 'regular',
                agreeToTerms: false
            });

            // Switch to status tab
            this.activeTab.set('status');
            
            alert('Application submitted successfully! You will receive an email confirmation shortly.');
        } catch (error) {
            alert('Failed to submit application. Please try again.');
        } finally {
            this.isSubmitting.set(false);
        }
    }

    protected getMembershipTypePrice(type: string): string {
        switch (type) {
            case 'regular': return '₹2,000/year';
            case 'lifetime': return '₹25,000 (one-time)';
            default: return 'Contact us';
        }
    }
}
