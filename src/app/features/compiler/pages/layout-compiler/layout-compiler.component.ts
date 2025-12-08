import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { EditorComponent } from '../../layout/editor/editor.component';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { CompilerHeader } from '../compiler-header/compiler-header';
import { OutputComponent } from '../../layout/output/output.component';

@Component({
  selector: 'app-layout-compiler',
  imports: [
    MateriallistModule,
    CompilerHeader,
    EditorComponent,
    OutputComponent,
  ],
  templateUrl: './layout-compiler.component.html',
  styleUrl: './layout-compiler.component.scss',
})
export class LayoutCompilerComponent {
  @Input() title: string = 'Compiler';
  @Input() fileName: string = 'main.txt';
  @Input() language: string = 'javascript'; // DYNAMIC EDITOR LANGUAGE
  @Input() defaultCode: string = ''; // DYNAMIC DEFAULT CODE

  @Output() onRun = new EventEmitter<string>(); // send code to page

  @ViewChild(EditorComponent) editor!: EditorComponent;

  stdout: string = '';
  stderr: string = '';

  run() {
    const code = this.editor.getCode();
    this.onRun.emit(code);
  }

  setOutput(stdout: string, stderr: string = '') {
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
}
