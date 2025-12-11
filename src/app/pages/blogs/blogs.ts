import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.html',
  styleUrls: ['./blogs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlogService],
  imports: [CommonModule, RouterLink, QuillViewHTMLComponent, FormsModule],
})
export class Blogs {
  private blogService = inject(BlogService);

  protected blogs = toSignal(this.blogService.getPublishedBlogs(), { initialValue: [] });
  protected searchTerm = signal('');
  protected isLoading = signal(false);

  protected getExcerpt(content: string, maxLength: number = 200): string {
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

  protected onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }
}
