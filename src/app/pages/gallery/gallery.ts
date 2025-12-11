import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GalleryService, GalleryCategory } from '../../services';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GalleryService],
  imports: [CommonModule, RouterLink, FormsModule],
})
export class GalleryComponent {
  private galleryService = inject(GalleryService);

  protected galleries = toSignal(this.galleryService.getPublishedGalleries(), {
    initialValue: [],
  });

  protected selectedCategory = signal<GalleryCategory | 'all'>('all');
  protected searchTerm = signal('');
  protected isLoading = signal(false);

  protected categories = [
    { label: 'All', value: 'all' },
    { label: 'Events', value: GalleryCategory.EVENTS },
    { label: 'Activities', value: GalleryCategory.ACTIVITIES },
    { label: 'Achievements', value: GalleryCategory.ACHIEVEMENTS },
    { label: 'General', value: GalleryCategory.GENERAL },
  ];

  protected filteredGalleries = computed(() => {
    const galleries = this.galleries();
    const category = this.selectedCategory();
    const search = this.searchTerm().toLowerCase();

    let filtered = galleries;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((g) => g.category === category);
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(search) ||
          g.description?.toLowerCase().includes(search),
      );
    }

    return filtered;
  });

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category as GalleryCategory | 'all');
  }

  protected onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  protected getCoverImage(gallery: any): string {
    if (gallery.images && gallery.images.length > 0) {
      return gallery.images[0].thumbnail || gallery.images[0].url;
    }
    return '/images/placeholder.jpg';
  }

  protected formatCategory(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
