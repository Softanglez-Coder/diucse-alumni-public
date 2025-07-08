import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventService]
})
export class Events {
  protected eventService = inject(EventService);
  
  protected events = this.eventService.findAll({
    active: true,
    sortBy: 'date',
    sort: 'asc'
  });

  protected featuredEvents = this.eventService.findAll({
    featured: true,
    active: true,
    sortBy: 'date',
    sort: 'asc'
  });

  selectedCategory = 'All';
  searchQuery = '';

  categories = [
    'All',
    'Networking',
    'Workshop',
    'Career',
    'Alumni Meet',
    'Webinar',
    'Conference'
  ];

  filterEvents(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.events = this.eventService.findAll({
        active: true,
        sortBy: 'date',
        sort: 'asc'
      });
    } else {
      this.events = this.eventService.findAll({
        category: category,
        active: true,
        sortBy: 'date',
        sort: 'asc'
      });
    }
  }

  searchEvents() {
    if (this.searchQuery.trim()) {
      this.events = this.eventService.findAll({
        search: this.searchQuery,
        active: true,
        sortBy: 'date',
        sort: 'asc'
      });
    } else {
      this.filterEvents(this.selectedCategory);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getRegistrationStatus(event: any): string {
    const percentage = (event.registered / event.capacity) * 100;
    if (percentage >= 90) return 'Almost Full';
    if (percentage >= 70) return 'Filling Fast';
    return 'Available';
  }

  getStatusColor(event: any): string {
    const percentage = (event.registered / event.capacity) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  }
}
