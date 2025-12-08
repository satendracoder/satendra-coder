import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SCompilers } from '../../service/s-compilers';
import { Router } from '@angular/router';
import { CompilerSetting } from '../compiler-setting/compiler-setting';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-compiler-header',
  imports: [MateriallistModule],
  templateUrl: './compiler-header.html',
  styleUrl: './compiler-header.scss',
})
export class CompilerHeader {
  @Input() title: string = 'Compiler';
  @Input() fileName: string = 'main.js';

  @Output() onRun = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onUpload = new EventEmitter<File>();

  handleUpload(event: any) {
    const file = event.target.files?.[0];
    if (file) this.onUpload.emit(file);
  }

  run() {
    this.onRun.emit();
  }

  save() {
    this.onSave.emit();
  }
}
