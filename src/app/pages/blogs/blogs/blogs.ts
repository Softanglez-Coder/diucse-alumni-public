import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../services';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogs.html',
  providers: [BlogService]
})
export class Blogs {
  private blogService = inject(BlogService);

  // Get all active blogs
  protected blogsResource = this.blogService.findAll({
    active: true,
    sortBy: 'date',
    sort: 'desc'
  });

  // Computed properties for featured and recent blogs
  protected featuredBlog = computed(() => {
    const blogs = this.blogsResource.value();
    return blogs.find(blog => blog.featured) || blogs[0];
  });

  protected recentBlogs = computed(() => {
    const blogs = this.blogsResource.value();
    const featured = this.featuredBlog();
    return blogs.filter(blog => blog.id !== featured?.id).slice(0, 2);
  });
}
