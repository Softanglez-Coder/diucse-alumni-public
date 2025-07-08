import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { EventService } from "../../../services";

@Component({
    selector: 'upcoming-events',
    templateUrl: './upcoming-events.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [EventService]
})
export class UpcomingEvents {
    protected events = inject(EventService).findAll({
        active: true,
        sortBy: 'date',
        sort: 'asc'
    });

    protected formatDate(dateString: string): { day: string, month: string } {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        return { day, month };
    }

    protected getProgressPercentage(registered: number, capacity: number): number {
        return Math.round((registered / capacity) * 100);
    }
}
