import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Layout } from './layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Layout, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
