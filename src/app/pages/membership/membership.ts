import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

interface MembershipBenefit {
    title: string;
    description: string;
    icon: string;
    category: 'networking' | 'career' | 'learning' | 'exclusive';
}

interface MembershipRequirement {
    title: string;
    description: string;
    icon: string;
    required: boolean;
}

interface KeyMember {
    name: string;
    position: string;
    company: string;
    graduationYear: number;
    image: string;
    linkedinUrl?: string;
    achievements: string[];
}

@Component({
    selector: 'membership',
    templateUrl: './membership.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule]
})
export class Membership {

    protected membershipBenefits: MembershipBenefit[] = [
        // Networking Benefits
        {
            title: 'Alumni Network Access',
            description: 'Connect with 5000+ alumni worldwide through our exclusive networking platform',
            icon: 'fa-users',
            category: 'networking'
        },
        {
            title: 'Industry Events',
            description: 'Exclusive invitations to networking events, tech talks, and industry meetups',
            icon: 'fa-calendar-alt',
            category: 'networking'
        },
        {
            title: 'Mentorship Program',
            description: 'Access to experienced mentors and opportunity to mentor junior alumni',
            icon: 'fa-hands-helping',
            category: 'networking'
        },

        // Career Benefits
        {
            title: 'Job Portal',
            description: 'Exclusive job postings from alumni-owned companies and partner organizations',
            icon: 'fa-briefcase',
            category: 'career'
        },
        {
            title: 'Career Guidance',
            description: 'Resume reviews, interview preparation, and career counseling sessions',
            icon: 'fa-route',
            category: 'career'
        },
        {
            title: 'Startup Support',
            description: 'Access to startup incubation resources and potential investor connections',
            icon: 'fa-rocket',
            category: 'career'
        },

        // Learning Benefits
        {
            title: 'Skill Development',
            description: 'Free workshops, webinars, and training sessions on latest technologies',
            icon: 'fa-graduation-cap',
            category: 'learning'
        },
        {
            title: 'Research Collaboration',
            description: 'Opportunities to collaborate on research projects with faculty and alumni',
            icon: 'fa-flask',
            category: 'learning'
        },
        {
            title: 'Knowledge Sharing',
            description: 'Access to alumni-created content, tutorials, and best practices',
            icon: 'fa-share-alt',
            category: 'learning'
        },

        // Exclusive Benefits
        {
            title: 'Directory Access',
            description: 'Searchable directory of all verified alumni with contact information',
            icon: 'fa-address-book',
            category: 'exclusive'
        },
        {
            title: 'Discounts & Offers',
            description: 'Special discounts on courses, events, and partner services',
            icon: 'fa-percentage',
            category: 'exclusive'
        },
        {
            title: 'Alumni Newsletter',
            description: 'Monthly newsletter with industry insights, alumni achievements, and opportunities',
            icon: 'fa-newspaper',
            category: 'exclusive'
        }
    ];

    protected membershipRequirements: MembershipRequirement[] = [
        {
            title: 'DIUCSE Graduate',
            description: 'Must be a graduate of Daffodil International University, Computer Science & Engineering department',
            icon: 'fa-graduation-cap',
            required: true
        },
        {
            title: 'Valid Credentials',
            description: 'Provide valid student ID number and graduation certificate for verification',
            icon: 'fa-id-card',
            required: true
        },
        {
            title: 'Professional Email',
            description: 'Active professional email address for ongoing communication',
            icon: 'fa-envelope',
            required: true
        },
        {
            title: 'Professional Experience',
            description: 'At least 1 year of professional work experience in relevant field',
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
            title: 'Reference',
            description: 'Reference from a current alumni member or faculty (for priority processing)',
            icon: 'fa-user-check',
            required: false
        }
    ];

    protected keyMembers: KeyMember[] = [
        {
            name: 'Dr. Md. Fokhray Hossain',
            position: 'Head of Department',
            company: 'Daffodil International University',
            graduationYear: 2008,
            image: '/images/members/dr-fokhray.jpg',
            linkedinUrl: 'https://linkedin.com/in/fokhray-hossain',
            achievements: [
                'PhD in Computer Science',
                'Published 50+ research papers',
                'Led department to top rankings'
            ]
        },
        {
            name: 'Shahidul Islam',
            position: 'Senior Software Engineer',
            company: 'Google',
            graduationYear: 2015,
            image: '/images/members/shahidul.jpg',
            linkedinUrl: 'https://linkedin.com/in/shahidul-islam',
            achievements: [
                'Lead engineer at Google Cloud',
                'Contributor to TensorFlow',
                'Tech speaker at international conferences'
            ]
        },
        {
            name: 'Fatema Rahman',
            position: 'Co-founder & CTO',
            company: 'TechVenture BD',
            graduationYear: 2013,
            image: '/images/members/fatema.jpg',
            linkedinUrl: 'https://linkedin.com/in/fatema-rahman',
            achievements: [
                'Built successful fintech startup',
                'Featured in Forbes 30 Under 30',
                'Mentor for 100+ startups'
            ]
        },
        {
            name: 'Mohammad Ali Khan',
            position: 'Principal Architect',
            company: 'Microsoft',
            graduationYear: 2012,
            image: '/images/members/ali-khan.jpg',
            linkedinUrl: 'https://linkedin.com/in/mohammad-ali-khan',
            achievements: [
                'Azure platform architect',
                'Microsoft MVP for 5 years',
                'Open source contributor'
            ]
        },
        {
            name: 'Rashida Begum',
            position: 'AI Research Scientist',
            company: 'Meta',
            graduationYear: 2016,
            image: '/images/members/rashida.jpg',
            linkedinUrl: 'https://linkedin.com/in/rashida-begum',
            achievements: [
                'PhD from Stanford University',
                'Published research on Computer Vision',
                'TEDx speaker on AI ethics'
            ]
        },
        {
            name: 'Rafiqul Islam',
            position: 'Engineering Manager',
            company: 'Amazon',
            graduationYear: 2014,
            image: '/images/members/rafiqul.jpg',
            linkedinUrl: 'https://linkedin.com/in/rafiqul-islam',
            achievements: [
                'Leading AWS infrastructure team',
                'Master\'s from Carnegie Mellon',
                'Patent holder in cloud computing'
            ]
        }
    ];

    protected getBenefitsByCategory(category: string): MembershipBenefit[] {
        return this.membershipBenefits.filter(benefit => benefit.category === category);
    }

    protected getRequiredRequirements(): MembershipRequirement[] {
        return this.membershipRequirements.filter(req => req.required);
    }

    protected getOptionalRequirements(): MembershipRequirement[] {
        return this.membershipRequirements.filter(req => !req.required);
    }
}
