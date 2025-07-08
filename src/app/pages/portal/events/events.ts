import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'conference' | 'workshop' | 'meetup' | 'seminar' | 'networking';
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    registrationStatus: 'registered' | 'waitlist' | 'attended' | 'missed';
    organizer: string;
    maxAttendees: number;
    currentAttendees: number;
    registrationDate?: string;
    isOrganizer?: boolean;
    coverImage?: string;
    tags: string[];
}

@Component({
    selector: 'events',
    templateUrl: './events.html',
    styleUrl: './events.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule]
})
export class Events {
    protected activeTab = signal<'registered' | 'organized' | 'available'>('registered');
    protected selectedFilter = signal<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
    protected searchQuery = signal('');

    // Mock data - in real app this would come from backend
    protected registeredEvents = signal<Event[]>([
        {
            id: '1',
            title: 'Annual Alumni Meetup 2024',
            description: 'Join us for our annual alumni gathering to network, share experiences, and celebrate our achievements.',
            date: '2024-12-15',
            time: '10:00 AM',
            location: 'Daffodil International University Campus',
            type: 'meetup',
            status: 'upcoming',
            registrationStatus: 'registered',
            organizer: 'Alumni Association',
            maxAttendees: 200,
            currentAttendees: 156,
            registrationDate: '2024-11-01',
            coverImage: '/images/events/meetup.jpg',
            tags: ['networking', 'alumni', 'annual']
        },
        {
            id: '2',
            title: 'Tech Career Development Workshop',
            description: 'Learn about the latest trends in technology and how to advance your career in the tech industry.',
            date: '2024-11-30',
            time: '2:00 PM',
            location: 'Online (Zoom)',
            type: 'workshop',
            status: 'completed',
            registrationStatus: 'attended',
            organizer: 'Dr. Rahman Khan',
            maxAttendees: 50,
            currentAttendees: 48,
            registrationDate: '2024-11-15',
            tags: ['technology', 'career', 'professional development']
        },
        {
            id: '3',
            title: 'AI & Machine Learning Conference',
            description: 'Explore the future of AI and machine learning with industry experts and researchers.',
            date: '2024-10-22',
            time: '9:00 AM',
            location: 'Dhaka Tech Hub',
            type: 'conference',
            status: 'completed',
            registrationStatus: 'missed',
            organizer: 'Tech Innovation Society',
            maxAttendees: 300,
            currentAttendees: 289,
            registrationDate: '2024-09-15',
            tags: ['AI', 'machine learning', 'technology']
        }
    ]);

    protected organizedEvents = signal<Event[]>([
        {
            id: '4',
            title: 'Web Development Bootcamp',
            description: 'Intensive 3-day bootcamp covering modern web development technologies and best practices.',
            date: '2025-01-20',
            time: '9:00 AM',
            location: 'DIU Innovation Lab',
            type: 'workshop',
            status: 'upcoming',
            registrationStatus: 'registered',
            organizer: 'John Doe',
            maxAttendees: 30,
            currentAttendees: 24,
            isOrganizer: true,
            tags: ['web development', 'programming', 'bootcamp']
        }
    ]);

    protected availableEvents = signal<Event[]>([
        {
            id: '5',
            title: 'Entrepreneurship Seminar',
            description: 'Learn from successful alumni entrepreneurs about starting and scaling your own business.',
            date: '2025-02-10',
            time: '3:00 PM',
            location: 'Business Incubation Center',
            type: 'seminar',
            status: 'upcoming',
            registrationStatus: 'registered',
            organizer: 'Entrepreneurship Club',
            maxAttendees: 100,
            currentAttendees: 45,
            tags: ['entrepreneurship', 'business', 'startup']
        },
        {
            id: '6',
            title: 'Alumni Networking Night',
            description: 'Casual networking event to connect with fellow alumni across different industries.',
            date: '2025-01-15',
            time: '6:00 PM',
            location: 'Sky Lounge, Gulshan',
            type: 'networking',
            status: 'upcoming',
            registrationStatus: 'registered',
            organizer: 'Alumni Relations Office',
            maxAttendees: 150,
            currentAttendees: 89,
            tags: ['networking', 'social', 'alumni']
        }
    ]);

    protected setActiveTab(tab: 'registered' | 'organized' | 'available') {
        this.activeTab.set(tab);
    }

    protected setFilter(filter: 'all' | 'upcoming' | 'completed' | 'cancelled') {
        this.selectedFilter.set(filter);
    }

    protected getFilteredEvents(): Event[] {
        let events: Event[] = [];
        
        switch (this.activeTab()) {
            case 'registered':
                events = this.registeredEvents();
                break;
            case 'organized':
                events = this.organizedEvents();
                break;
            case 'available':
                events = this.availableEvents();
                break;
        }

        // Apply status filter
        if (this.selectedFilter() !== 'all') {
            events = events.filter(event => event.status === this.selectedFilter());
        }

        // Apply search filter
        const query = this.searchQuery().toLowerCase();
        if (query) {
            events = events.filter(event => 
                event.title.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query) ||
                event.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return events;
    }

    protected getEventTypeClass(type: string): string {
        switch (type) {
            case 'conference': return 'type-conference';
            case 'workshop': return 'type-workshop';
            case 'meetup': return 'type-meetup';
            case 'seminar': return 'type-seminar';
            case 'networking': return 'type-networking';
            default: return 'type-default';
        }
    }

    protected getStatusClass(status: string): string {
        switch (status) {
            case 'upcoming': return 'status-upcoming';
            case 'ongoing': return 'status-ongoing';
            case 'completed': return 'status-completed';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-default';
        }
    }

    protected getRegistrationStatusClass(status: string): string {
        switch (status) {
            case 'registered': return 'reg-registered';
            case 'waitlist': return 'reg-waitlist';
            case 'attended': return 'reg-attended';
            case 'missed': return 'reg-missed';
            default: return 'reg-default';
        }
    }

    protected formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    protected isEventPast(dateString: string): boolean {
        const eventDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate < today;
    }

    protected canRegister(event: Event): boolean {
        return event.currentAttendees < event.maxAttendees && 
               event.status === 'upcoming' && 
               !this.isEventPast(event.date) &&
               this.activeTab() === 'available';
    }

    protected registerForEvent(event: Event) {
        // In real app, this would make an API call
        console.log('Registering for event:', event.title);
        
        // Simulate registration
        event.currentAttendees++;
        event.registrationStatus = 'registered';
        event.registrationDate = new Date().toISOString().split('T')[0];
        
        // Move event to registered events
        this.registeredEvents.update(events => [...events, event]);
        this.availableEvents.update(events => events.filter(e => e.id !== event.id));
        
        alert(`Successfully registered for "${event.title}"!`);
    }

    protected cancelRegistration(event: Event) {
        if (confirm(`Are you sure you want to cancel your registration for "${event.title}"?`)) {
            // In real app, this would make an API call
            console.log('Cancelling registration for event:', event.title);
            
            // Simulate cancellation
            event.currentAttendees--;
            delete event.registrationDate;
            
            // Move event back to available events
            this.availableEvents.update(events => [...events, event]);
            this.registeredEvents.update(events => events.filter(e => e.id !== event.id));
            
            alert(`Registration cancelled for "${event.title}".`);
        }
    }

    protected viewEventDetails(event: Event) {
        // In real app, this would navigate to event details page
        console.log('Viewing event details:', event);
        alert(`Event details for "${event.title}" would open here.`);
    }
}
