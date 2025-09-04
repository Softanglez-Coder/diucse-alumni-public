import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NewsService } from '../../../services';

@Component({
  selector: 'latest-news',
  templateUrl: './latest-news.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NewsService],
})
export class LatestNews {
  protected news = inject(NewsService).findAll({
    active: true,
    sortBy: 'date',
    sort: 'desc',
  });

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
