import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../../services';
import { BlogList } from '../../../shared';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogList],
  templateUrl: './blogs.html',
  providers: [BlogService]
})
export class Blogs {
  private blogService = inject(BlogService);

  // Get all published blogs
  protected blogsResource = this.blogService.getPublishedBlogs();

  // Computed properties for featured and recent blogs
  protected featuredBlog = computed(() => {
    const blogs = this.blogsResource.value();
    return blogs.find(blog => blog.featured) || blogs[0];
  });

  protected allBlogs = computed(() => {
    return this.blogsResource.value() || [];
  });

  // Helper methods
  getAuthorName(author: string | any): string {
    if (typeof author === 'string') {
      return author;
    }
    return author?.name || 'Unknown Author';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getExcerpt(blog: Blog): string {
    if (blog.excerpt) {
      return blog.excerpt;
    }
    // Generate excerpt from content
    const plainText = blog.content.replace(/<[^>]*>/g, '');
    return plainText.length > 150
      ? plainText.substring(0, 150) + '...'
      : plainText;
  }
}
