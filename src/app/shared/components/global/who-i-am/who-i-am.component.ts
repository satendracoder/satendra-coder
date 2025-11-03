import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MateriallistModule } from '../../../materiallist/materiallist-module';

@Component({
  selector: 'app-who-i-am',
  imports: [MateriallistModule],
  templateUrl: './who-i-am.component.html',
  styleUrl: './who-i-am.component.scss',
})
export class WhoIAmComponent {
  @Input() title = 'WHO I AM';
  @Input() visible = false; // control from parent
  @Input() autoHideMs: number | null = null; // e.g. 5000 to auto close after 5s
  @Output() visibleChange = new EventEmitter<boolean>();

  private hideTimer: any;

  ngOnChanges() {
    this.resetAutoHide();
  }

  ngOnDestroy() {
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  opened() {
    // called after shown (via *ngIf) to start auto hide if requested
    this.resetAutoHide();
  }

  private resetAutoHide() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.visible && this.autoHideMs && this.autoHideMs > 0) {
      this.hideTimer = setTimeout(() => this.close(), this.autoHideMs);
    }
  }
}
