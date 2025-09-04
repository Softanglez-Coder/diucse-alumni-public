import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cta-section',
  templateUrl: './cta-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSection {
  protected stats = [
    {
      number: '2,500+',
      label: 'Alumni Members',
    },
    {
      number: '150+',
      label: 'Companies',
    },
    {
      number: '50+',
      label: 'Countries',
    },
  ];

  protected features = [
    'Networking Opportunities',
    'Career Resources',
    'Alumni Directory',
    'Event Updates',
  ];
}
