import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

@Component({
    selector: 'layout',
    templateUrl: './layout.html',
    styleUrl: './layout.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        Footer,
        Navbar
    ]
})
export class Layout {}