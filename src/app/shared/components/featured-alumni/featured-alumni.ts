import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AlumniService } from "../../../services";

@Component({
    selector: 'featured-alumni',
    templateUrl: './featured-alumni.html',
    styleUrl: './featured-alumni.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AlumniService]
})
export class FeaturedAlumni {
    protected alumni = inject(AlumniService).findAll({
        featured: true,
        active: true,
        sortBy: 'year',
        sort: 'desc'
    });
}
