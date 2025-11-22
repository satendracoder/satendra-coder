import { Component, effect, Signal } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-footer-card',
  standalone: true,
  imports: [MateriallistModule],
  templateUrl: './footer-card.html',
  styleUrl: './footer-card.scss',
})
export class FooterCard {
  currentYear: number = new Date().getFullYear();

  constructor() {}
}
