import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import loader from '@monaco-editor/loader';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @ViewChild('editorRef') editorRef!: ElementRef;
  editor: any;

  @Input() language: string = 'javascript';
  @Input() value: string = `console.log("Hello World");`;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.changeDetection.detectChanges();
  }

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
    debugger;
    return this.editor.getValue();
  }

  // Parent can set code
  setCode(v: string) {
    this.editor.setValue(v);
  }
}
