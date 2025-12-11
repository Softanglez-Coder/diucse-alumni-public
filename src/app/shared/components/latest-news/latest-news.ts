import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NewsService } from '../../../services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'latest-news',
  templateUrl: './latest-news.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NewsService],
})
export class LatestNews {
  protected news = toSignal(inject(NewsService).findAll({
    active: true,
    sortBy: 'date',
    sort: 'desc',
  }), { initialValue: [] });

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
