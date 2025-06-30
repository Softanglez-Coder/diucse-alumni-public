import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'home',
    templateUrl: './home.html',
    styleUrl: './home.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}