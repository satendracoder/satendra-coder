import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MateriallistModule } from '../../../materiallist/materiallist-module';

@Component({
  selector: 'app-sc-button',
  imports: [MateriallistModule],
  templateUrl: './sc-button.component.html',
  styleUrl: './sc-button.component.scss',
})
export class ScButtonComponent {
  @Input() label: any = '';
  @Input() type: 'button' | 'submit' = 'button';

  // 🔥 5 Variants
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon' =
    'primary';

  // optional icon
  @Input() icon?: string;

  @Output() scClick = new EventEmitter<void>();

  onClick() {
    this.scClick.emit();
  }
}
