import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { BannerService } from "../../services";
import {
    BannerCarousel,
    CtaSection,
    UpcomingEvents,
    LatestNews,
    ContactSection
} from "../../shared";

@Component({
    selector: 'home',
    templateUrl: './home.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BannerService],
    imports: [
        BannerCarousel,
        CtaSection,
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
