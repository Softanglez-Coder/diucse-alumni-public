import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[footer]',
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
