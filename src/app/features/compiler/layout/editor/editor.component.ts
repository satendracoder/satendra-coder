import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { loader } from '@monaco-editor/loader';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  @ViewChild('editorRef') editorRef!: ElementRef;
  editor: any;

  @Input() language: string = 'javascript';
  @Input() value: string = `console.log("Hello World");`;

  @Output() codeChange = new EventEmitter<string>();

  async ngAfterViewInit() {
    const monaco = await loader.init();

    this.editor = monaco.editor.create(this.editorRef.nativeElement, {
      value: this.value,
      language: this.language,
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: true },
    });

    // On code change send to parent
    this.editor.onDidChangeModelContent(() => {
      this.codeChange.emit(this.editor.getValue());
    });
  }

  // Parent can get code
  getCode() {
    return this.editor.getValue();
  }

  // Parent can set code
  setCode(v: string) {
    this.editor.setValue(v);
  }
}
