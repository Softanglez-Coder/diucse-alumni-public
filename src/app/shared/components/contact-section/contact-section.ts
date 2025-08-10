import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'contact-section',
    templateUrl: './contact-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule]
})
export class ContactSection {
    protected contactInfo = [
        {
            icon: 'fa-location-dot',
            title: 'Address',
            content: 'Satarkul Rd, Dhaka 1212'
        },
        {
            icon: 'fa-envelope',
            title: 'Email',
            content: 'support&#64;csediualumni.com'
        }
    ];

    protected socialLinks = [
        {
            icon: 'fa-brands fa-facebook',
            url: '/facebook',
            label: 'Facebook'
        },
        {
            icon: 'fa-brands fa-linkedin',
            url: '/linkedin',
            label: 'LinkedIn'
        },
        {
            icon: 'fa-brands fa-twitter',
            url: '/twitter',
            label: 'Twitter'
        },
        {
            icon: 'fa-brands fa-instagram',
            url: '/instagram',
            label: 'Instagram'
        }
    ];
}
