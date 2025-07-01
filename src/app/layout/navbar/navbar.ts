import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: '[navbar]',
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink
    ]
})
export class Navbar {}