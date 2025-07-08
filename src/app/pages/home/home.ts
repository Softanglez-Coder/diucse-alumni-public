import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { BannerService } from "../../services";
import { 
    BannerCarousel, 
    CtaSection, 
    FeaturedAlumni, 
    UpcomingEvents, 
    LatestNews, 
    ContactSection 
} from "../../shared";

@Component({
    selector: 'home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BannerService],
    imports: [
        BannerCarousel,
        CtaSection,
        FeaturedAlumni,
        UpcomingEvents,
        LatestNews,
        ContactSection
    ]
})
export class Home {
    protected banners = inject(BannerService).findAll({
        active: true ,
        sortBy: 'order',
        sort: 'asc'
    });
}