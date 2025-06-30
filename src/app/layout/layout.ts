import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'layout',
    templateUrl: './layout.html',
    styleUrls: ['./layout.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {}