import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalDashboard {}