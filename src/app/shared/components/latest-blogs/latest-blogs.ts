import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlogService } from '../../../services';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'latest-blogs',
  templateUrl: './latest-blogs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlogService],
  imports: [CommonModule, RouterLink, QuillViewHTMLComponent],
})
export class LatestBlogs {
  protected blogs = toSignal(inject(BlogService).getLatestBlogs(4), { initialValue: [] });

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  protected getExcerpt(content: string, maxLength: number = 150): string {
    // For HTML content, we want to preserve some formatting while truncating
    if (!content) return '';

    // Remove HTML tags for length calculation
    const plainText = content.replace(/<[^>]*>/g, '');

    if (plainText.length <= maxLength) {
      return content;
    }

    // Find a good breaking point in the HTML content
    const truncated = this.truncateHTML(content, maxLength);
    return truncated + '...';
  }

  private truncateHTML(html: string, maxLength: number): string {
    let textLength = 0;
    let result = '';
    let inTag = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      if (char === '<') {
        inTag = true;
      } else if (char === '>') {
        inTag = false;
        result += char;
        continue;
      }

      if (inTag) {
        result += char;
      } else {
        if (textLength >= maxLength) {
          break;
        }
        result += char;
        if (char !== ' ' && char !== '\n' && char !== '\t') {
          textLength++;
        }
      }
    }

    return result;
  }
}
