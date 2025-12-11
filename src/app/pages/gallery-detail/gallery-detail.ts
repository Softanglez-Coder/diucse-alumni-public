import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GalleryService, Gallery, GalleryImage } from '../../services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.html',
  styleUrls: ['./gallery-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GalleryService],
  imports: [CommonModule, RouterLink],
})
export class GalleryDetailComponent implements OnInit, OnDestroy {
  private galleryService = inject(GalleryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  protected gallery = signal<Gallery | null>(null);
  protected isLoading = signal(true);
  protected lightboxOpen = signal(false);
  protected selectedImageIndex = signal(0);

  ngOnInit() {
    // Subscribe to route params to handle navigation between galleries
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadGallery(id);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    // Ensure body overflow is reset
    document.body.style.overflow = 'auto';
  }

  private loadGallery(id: string) {
    this.isLoading.set(true);
    this.galleryService
      .getGalleryById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (gallery) => {
          this.gallery.set(gallery);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading gallery:', error);
          this.isLoading.set(false);
          this.router.navigate(['/gallery']);
        },
      });
  }

  protected openLightbox(index: number): void {
    this.selectedImageIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  protected nextImage(): void {
    const images = this.gallery()?.images || [];
    const currentIndex = this.selectedImageIndex();
    const nextIndex = (currentIndex + 1) % images.length;
    this.selectedImageIndex.set(nextIndex);
  }

  protected previousImage(): void {
    const images = this.gallery()?.images || [];
    const currentIndex = this.selectedImageIndex();
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    this.selectedImageIndex.set(prevIndex);
  }

  protected formatCategory(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
}
