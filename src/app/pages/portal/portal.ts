import { NgClass } from '@angular/common';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

interface Link {
  title: string;
  path: string;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'portal',
  templateUrl: './portal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
})
export class Portal {
  private router = inject(Router);

  protected links = httpResource<Array<Link>>(() => '/data/portal-links.json');
  protected collapsed = document.body.clientWidth < 768;

  // Create a signal from router navigation events
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  // Compute selected link based on current route
  protected selected = computed(() => {
    const url = this.currentUrl();
    const links = this.links.value();

    if (!links || links.length === 0) return null;

    // Remove query parameters and fragments for cleaner matching
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Sort by path length (descending) to match the most specific route first
    const sortedLinks = [...links].sort(
      (a, b) => b.path.length - a.path.length,
    );

    // Find exact match or path prefix match
    let selectedLink = sortedLinks.find((link) => {
      return cleanUrl === link.path || cleanUrl.startsWith(link.path + '/');
    });

    // Fallback: if we're on /portal but no specific page, select the first link (usually Dashboard)
    if (!selectedLink && cleanUrl === '/portal') {
      selectedLink = links[0];
    }

    return selectedLink || null;
  });

  protected onLinkClicked(link: Link) {
    // Keep this method for any additional logic if needed
    // The selected property will be automatically updated by the computed signal
  }
}
