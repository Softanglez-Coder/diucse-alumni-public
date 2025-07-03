import { NgClass } from "@angular/common";
import { httpResource } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, resource } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

interface Link {
    title: string;
    path: string;
    icon?: string;
    description?: string;
}

@Component({
    selector: 'portal',
    templateUrl: './portal.html',
    styleUrl: './portal.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgClass
    ]
})
export class Portal {
    protected links = httpResource<Array<Link>>(() => '/data/portal-links.json');
    protected collapsed = document.body.clientWidth < 768;

    protected selected: Link | null = null;

    protected onLinkClicked(link: Link) {
        this.selected = link;
    }
}