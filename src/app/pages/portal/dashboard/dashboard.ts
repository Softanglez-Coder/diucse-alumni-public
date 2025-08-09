import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { DashboardService, DashboardStats, RecentActivity } from "../../../services";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe],
    providers: [DashboardService]
})
export class PortalDashboard {
    private dashboardService = inject(DashboardService);

    // Dashboard statistics resource
    statsResource = this.dashboardService.getStats();

    // Recent activities resource
    recentActivitiesResource = this.dashboardService.getRecentActivities();

    // Helper method to get icon class based on activity type
    getActivityIconClass(activity: RecentActivity): string {
        const iconClasses = {
            'new_alumni': 'fa-user-plus',
            'event_registration': 'fa-calendar-check',
            'system_update': 'fa-bell',
            'news': 'fa-newspaper',
            'general': 'fa-info-circle'
        };
        return iconClasses[activity.type] || 'fa-info-circle';
    }

    // Helper method to get icon color class based on activity type
    getActivityIconColorClass(activity: RecentActivity): string {
        const colorClasses = {
            'new_alumni': 'bg-primary-100 text-primary-600',
            'event_registration': 'bg-green-100 text-green-600',
            'system_update': 'bg-orange-100 text-orange-600',
            'news': 'bg-blue-100 text-blue-600',
            'general': 'bg-gray-100 text-gray-600'
        };
        return colorClasses[activity.type] || 'bg-gray-100 text-gray-600';
    }
}
