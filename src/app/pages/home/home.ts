import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { BannerService, UserService } from "../../services";
import { toSignal } from "@angular/core/rxjs-interop";
import {
    BannerCarousel,
    ContactSection
} from "../../shared";
import { MembersList } from "../../shared/components/members-list/members-list";

@Component({
    selector: 'home',
    templateUrl: './home.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BannerService, UserService],
    imports: [
        BannerCarousel,
        ContactSection,
        MembersList
    ]
})
export class Home {
    private bannerService = inject(BannerService);
    private userService = inject(UserService);

    protected banners = this.bannerService.findAll({
        active: true,
        sortBy: 'order',
        sort: 'asc'
    });

    // Get all members and take first 4-5 for homepage
    private allMembers = toSignal(this.userService.getMembers(), { initialValue: [] });

    protected featuredMembers = computed(() => {
        return this.allMembers().slice(0, 4);
    });
}
