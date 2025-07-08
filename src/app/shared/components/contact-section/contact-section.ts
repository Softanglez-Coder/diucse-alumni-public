import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'contact-section',
    templateUrl: './contact-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSection {
    protected contactInfo = [
        {
            icon: 'fa-location-dot',
            title: 'Address',
            content: 'Dhaka International University\n102/1, Shukrabad, Mirpur Road\nDhaka-1207, Bangladesh'
        },
        {
            icon: 'fa-phone',
            title: 'Phone',
            content: '+880-2-9138234-5'
        },
        {
            icon: 'fa-envelope',
            title: 'Email',
            content: 'alumni&#64;diu.edu.bd'
        }
    ];

    protected socialLinks = [
        {
            icon: 'fa-brands fa-facebook',
            url: 'https://facebook.com/diubd',
            label: 'Facebook'
        },
        {
            icon: 'fa-brands fa-linkedin',
            url: 'https://linkedin.com/company/diu-alumni',
            label: 'LinkedIn'
        },
        {
            icon: 'fa-brands fa-twitter',
            url: 'https://twitter.com/diubd',
            label: 'Twitter'
        },
        {
            icon: 'fa-brands fa-instagram',
            url: 'https://instagram.com/diubd',
            label: 'Instagram'
        }
    ];
}
