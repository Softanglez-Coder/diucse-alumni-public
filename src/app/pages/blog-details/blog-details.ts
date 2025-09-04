import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { BlogService } from '../../services';
import { Blog, BlogStatus } from '../../shared';
import { computed } from '@angular/core';

@Component({
  selector: 'blog-details',
  imports: [CommonModule, QuillModule],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetails {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  // Get the blog ID from route parameters
  private blogId = this.route.snapshot.paramMap.get('id') || '';

  // Blog resource - created in field initializer
  private blogResource = this.blogService.getBlogById(this.blogId);

  // Computed properties for the template
  blog = computed(() => this.blogResource.value());
  loading = computed(
    () => !this.blog() || Object.keys(this.blog()).length === 0,
  );
  error = computed(() => this.blog() && !this.blog().id && !this.loading());

  // Expose BlogStatus enum to template
  BlogStatus = BlogStatus;

  getStatusClass(status: BlogStatus): string {
    switch (status) {
      case BlogStatus.DRAFT:
        return 'badge-warning';
      case BlogStatus.IN_REVIEW:
        return 'badge-info';
      case BlogStatus.PUBLISHED:
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  }

  getStatusText(status: BlogStatus): string {
    switch (status) {
      case BlogStatus.DRAFT:
        return 'Draft';
      case BlogStatus.IN_REVIEW:
        return 'In Review';
      case BlogStatus.PUBLISHED:
        return 'Published';
      default:
        return 'Unknown';
    }
  }
}
