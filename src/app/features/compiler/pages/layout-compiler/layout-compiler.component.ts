import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { EditorComponent } from '../../layout/editor/editor.component';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { OutputComponent } from '../../layout/output/output.component';

@Component({
  selector: 'app-layout-compiler',
  imports: [MateriallistModule, EditorComponent, OutputComponent],
  templateUrl: './layout-compiler.component.html',
  styleUrl: './layout-compiler.component.scss',
})
export class LayoutCompilerComponent {
  @Input() title: string = 'Compiler';
  @Input() fileName: string = 'main.txt';
  @Input() language: string = 'javascript'; // DYNAMIC EDITOR LANGUAGE
  @Input() defaultCode: string = ''; // DYNAMIC DEFAULT CODE

  @Output() onRun = new EventEmitter<string>(); // send code to page
  @Output() onSave = new EventEmitter<void>();
  @Output() onUpload = new EventEmitter<File>();

  @ViewChild(EditorComponent) editor!: EditorComponent;

  stdout: string = '';
  stderr: string = '';

  // resize
  isResizing = false;
  startX = 0;
  leftWidth = 0;

  handleUpload(event: any) {
    const file = event.target.files?.[0];
    if (file) this.onUpload.emit(file);
  }

  run() {
    debugger;
    const code = this.editor.getCode();
    this.onRun.emit(code);
  }

  setOutput(stdout: string, stderr: string = '') {
    debugger;
    this.stdout = stdout;
    this.stderr = stderr;
  }

  save() {
    debugger;
    const blob = new Blob([this.editor.getCode()], { type: 'text/plain' });
    const a = document.createElement('a');
    a.download = this.fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
  }

  upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.editor.setCode(String(reader.result));
    };
    reader.readAsText(file);
  }

  // Resize
  startResize(e: MouseEvent) {
    this.isResizing = true;
    this.startX = e.clientX;

    const leftPanel = document.querySelector('.left-panel') as HTMLElement;
    this.leftWidth = leftPanel.getBoundingClientRect().width;

    document.addEventListener('mousemove', this.resizeMove);
    document.addEventListener('mouseup', this.stopResize);
  }

  resizeMove = (e: MouseEvent) => {
    if (!this.isResizing) return;

    const dx = e.clientX - this.startX;
    const newLeftWidth = this.leftWidth + dx;

    const leftPanel = document.querySelector('.left-panel') as HTMLElement;
    const rightPanel = document.querySelector('.right-panel') as HTMLElement;

    const total = leftPanel.parentElement!.clientWidth;

    leftPanel.style.flex = `0 0 ${newLeftWidth}px`;
    rightPanel.style.flex = `1 1 auto`;
  };

  stopResize = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.resizeMove);
    document.removeEventListener('mouseup', this.stopResize);
  };
}
