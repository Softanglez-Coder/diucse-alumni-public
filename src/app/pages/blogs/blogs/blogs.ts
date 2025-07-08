import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogs.html',
  styleUrls: ['./blogs.scss']
})
export class Blogs {
  blogs = [
    {
      id: 1,
      title: 'The Future of Computer Science Education',
      excerpt: 'Exploring the evolving landscape of CS education and its impact on the industry.',
      author: 'Dr. Rahman Ahmed',
      date: '2024-12-15',
      readTime: '5 min read',
      image: '/images/blog1.jpg',
      tags: ['Education', 'Technology', 'Future']
    },
    {
      id: 2,
      title: 'Alumni Success Stories: From Classroom to Boardroom',
      excerpt: 'Inspiring journeys of DIUCSE graduates who made it to leadership positions.',
      author: 'Sarah Khan',
      date: '2024-12-10',
      readTime: '8 min read',
      image: '/images/blog2.jpg',
      tags: ['Success Stories', 'Leadership', 'Career']
    },
    {
      id: 3,
      title: 'Building the Next Generation of Tech Leaders',
      excerpt: 'How DIUCSE is preparing students for tomorrow\'s technology challenges.',
      author: 'Prof. Mahmud Hassan',
      date: '2024-12-05',
      readTime: '6 min read',
      image: '/images/blog3.jpg',
      tags: ['Leadership', 'Technology', 'Education']
    }
  ];

  featuredBlog = this.blogs[0];
  recentBlogs = this.blogs.slice(1);
}
