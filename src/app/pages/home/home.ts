import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { BannerService } from "../../services";
import {
    BannerCarousel,
    ContactSection
} from "../../shared";

@Component({
    selector: 'home',
    templateUrl: './home.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BannerService],
    imports: [
        BannerCarousel,
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
