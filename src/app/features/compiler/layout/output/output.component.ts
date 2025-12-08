import { Component, Input } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-output',
  imports: [MateriallistModule],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss',
})
export class OutputComponent {
  @Input() stdout: string = '';
  @Input() stderr: string = '';
}
