import { ChangeDetectionStrategy, Component, Input, signal, computed, effect, OnDestroy, OnInit } from "@angular/core";
import { Banner } from "../../../services/banner/banner";

@Component({
    selector: 'banner-carousel',
    templateUrl: './banner-carousel.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerCarousel implements OnInit, OnDestroy {
    @Input() banners: Banner[] = [];
    @Input() autoPlay: boolean = true;
    @Input() autoPlayDelay: number = 5000;
    @Input() showControls: boolean = true;
    @Input() showPagination: boolean = true;

    // Carousel state
    protected currentIndex = signal(0);
    protected autoPlayInterval: any;

    // Computed properties
    protected totalBanners = computed(() => this.banners.length);
    protected currentBanner = computed(() => {
        return this.banners && this.banners.length > 0 ? this.banners[this.currentIndex()] : null;
    });

    ngOnInit() {
        if (this.autoPlay && this.banners.length > 1) {
            this.startAutoPlay();
        }
    }

    ngOnDestroy() {
        this.stopAutoPlay();
    }

    // Navigation methods
    protected goToNext() {
        if (this.totalBanners() === 0) return;
        
        this.stopAutoPlay();
        const total = this.totalBanners();
        this.currentIndex.set((this.currentIndex() + 1) % total);
        
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }

    protected goToPrevious() {
        if (this.totalBanners() === 0) return;
        
        this.stopAutoPlay();
        const total = this.totalBanners();
        this.currentIndex.set((this.currentIndex() - 1 + total) % total);
        
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }

    protected goToSlide(index: number) {
        if (index < 0 || index >= this.totalBanners()) return;
        
        this.stopAutoPlay();
        this.currentIndex.set(index);
        
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }

    // Auto-play functionality
    private startAutoPlay() {
        this.stopAutoPlay();
        if (this.autoPlay && this.totalBanners() > 1) {
            this.autoPlayInterval = setInterval(() => {
                const total = this.totalBanners();
                this.currentIndex.set((this.currentIndex() + 1) % total);
            }, this.autoPlayDelay);
        }
    }

    private stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Pause auto-play on mouse hover
    protected onMouseEnter() {
        if (this.autoPlay) {
            this.stopAutoPlay();
        }
    }

    // Resume auto-play on mouse leave
    protected onMouseLeave() {
        if (this.autoPlay && this.totalBanners() > 1) {
            this.startAutoPlay();
        }
    }
}
