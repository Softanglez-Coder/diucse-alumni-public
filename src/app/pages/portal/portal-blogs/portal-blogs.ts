import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BlogService } from '../../../services';
import { Blog, BlogStatus } from '../../../shared';

@Component({
  selector: 'portal-blogs',
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './portal-blogs.html',
  styleUrl: './portal-blogs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalBlogs {
  private blogService = inject(BlogService);
  private fb = inject(FormBuilder);

  // Signals for state management
  showCreateForm = signal(false);
  isSubmitting = signal(false);

  // Form for creating/editing blogs
  blogForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(50)]]
  });

  // Quill editor configuration
  quillConfig = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ]
    },
    theme: 'snow'
  };

  // Get user's blogs
  myBlogs = this.blogService.getMyBlogs();

  // Expose BlogStatus enum to template
  BlogStatus = BlogStatus;

  toggleCreateForm() {
    this.showCreateForm.update(value => !value);
    if (!this.showCreateForm()) {
      this.blogForm.reset();
    }
  }

  async submitBlog() {
    if (this.blogForm.invalid) {
      this.markFormGroupTouched(this.blogForm);
      return;
    }

    this.isSubmitting.set(true);

    try {
      const formValue = this.blogForm.value;
      const blogData: Partial<Blog> = {
        title: formValue.title,
        content: formValue.content,
        status: BlogStatus.DRAFT
      };

      await this.blogService.createBlog(blogData as Blog);

      // Reset form and hide create form
      this.blogForm.reset();
      this.showCreateForm.set(false);

      // Refresh blog list
      this.myBlogs = this.blogService.getMyBlogs();

    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async submitForReview(blogId: string) {
    try {
      await this.blogService.reviewBlog(blogId);
      // Refresh blog list
      this.myBlogs = this.blogService.getMyBlogs();
    } catch (error) {
      console.error('Error submitting blog for review:', error);
    }
  }

  async markAsDraft(blogId: string) {
    try {
      await this.blogService.draftBlog(blogId);
      // Refresh blog list
      this.myBlogs = this.blogService.getMyBlogs();
    } catch (error) {
      console.error('Error marking blog as draft:', error);
    }
  }

  canSubmitForReview(blog: Blog): boolean {
    return blog.status === BlogStatus.DRAFT;
  }

  canMarkAsDraft(blog: Blog): boolean {
    return blog.status === BlogStatus.IN_REVIEW;
  }

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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
