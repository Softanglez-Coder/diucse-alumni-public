import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalDashboard {}