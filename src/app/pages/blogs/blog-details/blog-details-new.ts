import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../../services';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details.html',
  providers: [BlogService]
})
export class BlogDetails {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  protected blogId = computed(() => this.route.snapshot.paramMap.get('id') || '');

  // Get the specific blog
  protected blog = computed(() => {
    const id = this.blogId();
    if (id) {
      return this.blogService.findOne(id);
    }
    return null;
  });

  // Get related blogs (other published blogs)
  protected relatedBlogs = computed(() => {
    const currentBlogId = this.blogId();
    const publishedBlogs = this.blogService.getPublishedBlogs();
    return publishedBlogs.value()
      .filter(blog => blog.id !== currentBlogId)
      .slice(0, 3);
  });

  // Helper methods
  getAuthorName(author: string | any): string {
    if (typeof author === 'string') {
      return author;
    }
    return author?.name || 'Unknown Author';
  }

  getAuthorAvatar(author: string | any): string {
    if (typeof author === 'string') {
      return '/images/members/default-avatar.svg';
    }
    return author?.avatar || '/images/members/default-avatar.svg';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  }
}
