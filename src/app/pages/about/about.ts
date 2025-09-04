import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlumniService } from '../../services';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlumniService],
})
export class About {
  protected alumniService = inject(AlumniService);

  protected featuredAlumni = this.alumniService.findAll({
    featured: true,
    active: true,
  });

  stats = [
    { number: '2500+', label: 'Alumni Worldwide', icon: 'users' },
    { number: '50+', label: 'Countries', icon: 'globe' },
    { number: '15+', label: 'Years of Excellence', icon: 'calendar' },
    { number: '100+', label: 'Industry Partners', icon: 'briefcase' },
  ];

  values = [
    {
      title: 'Excellence',
      description:
        'We strive for excellence in everything we do, maintaining the high standards that DIUCSE is known for.',
      icon: 'star',
    },
    {
      title: 'Innovation',
      description:
        'Embracing cutting-edge technologies and innovative solutions to solve real-world problems.',
      icon: 'lightbulb',
    },
    {
      title: 'Collaboration',
      description:
        'Building strong networks and fostering meaningful connections among our global alumni community.',
      icon: 'team',
    },
    {
      title: 'Impact',
      description:
        'Making a positive impact on society through technology, leadership, and community service.',
      icon: 'rocket',
    },
  ];

  achievements = [
    {
      year: '2010',
      title: 'Foundation',
      description:
        'DIUCSE Alumni Association was established to connect graduates worldwide.',
    },
    {
      year: '2015',
      title: 'Global Expansion',
      description:
        'Reached 1000+ alumni across 25 countries with regional chapters.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description:
        'Launched digital platform for seamless networking and career development.',
    },
    {
      year: '2025',
      title: 'New Milestone',
      description:
        'Celebrating 2500+ alumni network with enhanced mentorship programs.',
    },
  ];
}
