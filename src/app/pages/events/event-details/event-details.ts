import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.html',
})
export class EventDetails implements OnInit {
  eventId: string | null = null;
  
  event = {
    id: 1,
    title: 'Tech Innovation Summit 2025',
    description: 'Join us for an exciting day of innovation, networking, and learning at our annual Tech Innovation Summit. This premier event brings together industry leaders, alumni, and current students to explore the latest trends in technology and computer science.',
    fullDescription: `
      <p>The Tech Innovation Summit 2025 is DIUCSE's flagship event, designed to bridge the gap between academia and industry. This year's summit will focus on emerging technologies and their impact on the future of work.</p>
      
      <h3>What to Expect</h3>
      <ul>
        <li>Keynote presentations from industry leaders</li>
        <li>Interactive workshops on cutting-edge technologies</li>
        <li>Networking sessions with successful alumni</li>
        <li>Student project showcases</li>
        <li>Career guidance and mentorship opportunities</li>
      </ul>
      
      <h3>Featured Topics</h3>
      <ul>
        <li>Artificial Intelligence and Machine Learning</li>
        <li>Blockchain and Cryptocurrency</li>
        <li>Cloud Computing and DevOps</li>
        <li>Cybersecurity</li>
        <li>Mobile and Web Development</li>
      </ul>
    `,
    date: '2025-03-15',
    time: '9:00 AM - 6:00 PM',
    location: 'DIUCSE Campus, Main Auditorium',
    address: 'House # 4, Road # 1, Block # A, Lalmatia, Dhaka 1207',
    price: 'Free for Alumni',
    capacity: 300,
    registered: 127,
    image: '/images/event1.jpg',
    organizer: 'DIUCSE Alumni Association',
    category: 'Technology',
    status: 'upcoming',
    speakers: [
      {
        name: 'Dr. Sarah Ahmed',
        title: 'CTO, TechCorp Bangladesh',
        bio: 'Leading AI researcher with 15+ years of experience',
        image: '/images/speaker1.jpg'
      },
      {
        name: 'Md. Rafiqul Islam',
        title: 'Senior Software Engineer, Google',
        bio: 'Cloud architecture expert and DIUCSE alumnus',
        image: '/images/speaker2.jpg'
      },
      {
        name: 'Fatima Khan',
        title: 'Cybersecurity Consultant',
        bio: 'Information security specialist and startup founder',
        image: '/images/speaker3.jpg'
      }
    ],
    agenda: [
      { time: '9:00 AM', activity: 'Registration & Welcome Coffee' },
      { time: '10:00 AM', activity: 'Opening Ceremony & Keynote' },
      { time: '11:30 AM', activity: 'Panel Discussion: Future of AI' },
      { time: '1:00 PM', activity: 'Lunch Break & Networking' },
      { time: '2:30 PM', activity: 'Workshop Sessions' },
      { time: '4:00 PM', activity: 'Student Project Showcase' },
      { time: '5:30 PM', activity: 'Closing Remarks & Certificate Distribution' }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    // In a real app, you would fetch the event details based on the ID
  }

  getAvailableSpots() {
    return this.event.capacity - this.event.registered;
  }

  getRegistrationPercentage() {
    return (this.event.registered / this.event.capacity) * 100;
  }
}
