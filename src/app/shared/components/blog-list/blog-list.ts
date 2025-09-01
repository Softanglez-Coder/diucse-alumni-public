import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../../services/blog/blog';

@Component({
  selector: 'blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogList {
  @Input() blogs: Blog[] = [];
  @Input() title = 'Latest Blogs';
  @Input() subtitle = 'Stay updated with our latest insights and stories';
  @Input() showViewAllLink = true;
  @Input() layout: 'grid' | 'list' = 'grid';
  @Input() showExcerpt = true;
  @Input() showAuthor = true;
  @Input() showDate = true;

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
