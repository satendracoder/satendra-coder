import { Component } from '@angular/core';
import { MateriallistModule } from '../../../materiallist/materiallist-module';

@Component({
  selector: 'app-global-contact',
  imports: [MateriallistModule],
  templateUrl: './global-contact.html',
  styleUrl: './global-contact.scss',
})
export class GlobalContact {}
