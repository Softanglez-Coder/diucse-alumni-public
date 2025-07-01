import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {}