import { httpResource } from "@angular/common/http";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Link } from "../../shared";

@Component({
    selector: '[navbar]',
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        RouterLinkActive
    ]
})
export class Navbar {
    protected linksRequest = httpResource<Array<Link>>(() => '/data/nav-links.json', {
        defaultValue: []
    });
}