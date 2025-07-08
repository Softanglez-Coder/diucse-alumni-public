import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details.html',
  styleUrls: ['./blog-details.scss']
})
export class BlogDetails implements OnInit {
  blogId: string | null = null;
  
  blog = {
    id: 1,
    title: 'The Future of Computer Science Education',
    content: `
      <p>The landscape of computer science education is rapidly evolving, driven by technological advancements and changing industry demands. As we look towards the future, several key trends are shaping how we teach and learn computer science.</p>
      
      <h3>Emerging Technologies in Education</h3>
      <p>Artificial Intelligence and Machine Learning are not just subjects we teach, but tools that are revolutionizing the educational process itself. AI-powered personalized learning platforms can adapt to individual student needs, providing customized learning paths that optimize understanding and retention.</p>
      
      <h3>Industry-Academia Collaboration</h3>
      <p>The gap between academic learning and industry requirements is narrowing through increased collaboration. Universities are partnering with tech companies to ensure curricula remain relevant and graduates are job-ready.</p>
      
      <h3>Skills for the Future</h3>
      <p>Beyond traditional programming skills, tomorrow's computer scientists need to develop:</p>
      <ul>
        <li>Critical thinking and problem-solving abilities</li>
        <li>Interdisciplinary knowledge spanning multiple domains</li>
        <li>Ethical considerations in technology development</li>
        <li>Communication and collaboration skills</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>The future of computer science education is bright, with exciting opportunities to create more engaging, relevant, and effective learning experiences for students worldwide.</p>
    `,
    author: 'Dr. Rahman Ahmed',
    authorBio: 'Professor of Computer Science at Dhaka International University with over 15 years of experience in academia and research.',
    authorImage: '/images/author1.jpg',
    date: '2024-12-15',
    readTime: '5 min read',
    image: '/images/blog1.jpg',
    tags: ['Education', 'Technology', 'Future'],
    category: 'Education'
  };

  relatedBlogs = [
    {
      id: 2,
      title: 'Alumni Success Stories: From Classroom to Boardroom',
      excerpt: 'Inspiring journeys of DIUCSE graduates who made it to leadership positions.',
      image: '/images/blog2.jpg',
      date: '2024-12-10'
    },
    {
      id: 3,
      title: 'Building the Next Generation of Tech Leaders',
      excerpt: 'How DIUCSE is preparing students for tomorrow\'s technology challenges.',
      image: '/images/blog3.jpg',
      date: '2024-12-05'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    // In a real app, you would fetch the blog details based on the ID
  }
}
