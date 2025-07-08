import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './event-registration.html',
  styleUrls: ['./event-registration.scss']
})
export class EventRegistration implements OnInit {
  eventId: string | null = null;
  currentStep = 1;
  totalSteps = 3;
  
  event = {
    id: 1,
    title: 'Tech Innovation Summit 2025',
    date: '2025-03-15',
    time: '9:00 AM - 6:00 PM',
    location: 'DIUCSE Campus, Main Auditorium',
    price: 'Free for Alumni'
  };

  registrationData = {
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Alumni Information
    graduationYear: '',
    degree: '',
    currentJobTitle: '',
    currentCompany: '',
    
    // Event Preferences
    dietaryRestrictions: '',
    accessibility: '',
    sessions: [] as string[],
    networking: true,
    
    // Additional
    emergencyContact: '',
    emergencyPhone: '',
    comments: ''
  };

  availableSessions = [
    'AI and Machine Learning Workshop',
    'Blockchain Technology Session',
    'Cloud Computing Deep Dive',
    'Cybersecurity Best Practices',
    'Mobile Development Trends',
    'Career Development Panel'
  ];

  degreeOptions = [
    'Bachelor of Science in Computer Science',
    'Bachelor of Science in Software Engineering',
    'Master of Science in Computer Science',
    'PhD in Computer Science'
  ];

  graduationYears = this.generateYearRange(2010, new Date().getFullYear());

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  generateYearRange(start: number, end: number): number[] {
    const years = [];
    for (let year = end; year >= start; year--) {
      years.push(year);
    }
    return years;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSessionChange(session: string, event: any) {
    if (event.target.checked) {
      this.registrationData.sessions.push(session);
    } else {
      const index = this.registrationData.sessions.indexOf(session);
      if (index > -1) {
        this.registrationData.sessions.splice(index, 1);
      }
    }
  }

  isSessionSelected(session: string): boolean {
    return this.registrationData.sessions.includes(session);
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.registrationData.firstName && 
                 this.registrationData.lastName && 
                 this.registrationData.email && 
                 this.registrationData.phone);
      case 2:
        return !!(this.registrationData.graduationYear && 
                 this.registrationData.degree);
      case 3:
        return true; // Additional info is optional
      default:
        return false;
    }
  }

  submitRegistration() {
    console.log('Registration submitted:', this.registrationData);
    // In a real app, you would send this data to your backend
    alert('Registration submitted successfully!');
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Alumni Information';
      case 3: return 'Event Preferences';
      default: return '';
    }
  }
}
