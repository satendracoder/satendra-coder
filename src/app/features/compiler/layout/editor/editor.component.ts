import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import loader from '@monaco-editor/loader';
import {
  EditorSettings,
  SettingService,
} from '../../service/setting/setting.service';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-editor',
  imports: [MateriallistModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @ViewChild('editorRef') editorRef!: ElementRef;
  editor: any;

  @Input() fileName: string = 'main.js';
  @Input() language: string = 'javascript';
  @Input() value: string = `console.log("Hello World");`;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private themeService: SettingService
  ) {
    effect(() => {
      const s = this.themeService.settings();
      this.settings = s;
      this.local.autoSuggestion = s.autoSuggestion;
      this.local.fontFamily = s.fontFamily;
      this.local.fontSize = s.fontSize;
      this.local.tabSize = s.tabSize;
      this.local.lineHeight = s.lineHeight;
      // 🔥 LIVE UPDATE MONACO
      this.updateEditorSettings();
    });
  }

  // Setting card
  settings!: EditorSettings;

  local = {
    autoSuggestion: true,
    fontFamily: '',
    fontSize: 14,
    tabSize: 2,
    lineHeight: 20,
  };

  fontOptions = [
    'Inter, Roboto, Arial, sans-serif',
    'Roboto Mono, monospace',
    'Fira Code, monospace',
    'Source Sans Pro, sans-serif',
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.changeDetection.detectChanges();
  }

  @Output() codeChange = new EventEmitter<string>();

  async ngAfterViewInit() {
    debugger;
    const monaco = await loader.init();

    this.editor = monaco.editor.create(this.editorRef.nativeElement, {
      value: this.value,
      language: this.language,
      theme: 'vs-dark',
      automaticLayout: this.local.autoSuggestion,
      fontSize: this.local.fontSize,
      minimap: { enabled: true },
      fontFamily: this.local.fontFamily,
      quickSuggestions: this.local.autoSuggestion,
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      formatOnPaste: true,
      formatOnType: true,
      lineHeight: this.local.lineHeight,
      renderLineHighlight: 'all',
    });

    this.updateEditorSettings(); // ✅ initial sync
    // On code change send to parent
    this.editor.onDidChangeModelContent(() => {
      this.codeChange.emit(this.editor.getValue());
    });
  }

  private updateEditorSettings() {
    if (!this.editor) return;

    this.editor.updateOptions({
      fontSize: this.local.fontSize,
      fontFamily: this.local.fontFamily,
      tabSize: this.local.tabSize,
      lineHeight: this.local.lineHeight,
      quickSuggestions: this.local.autoSuggestion,
      automaticLayout: true,
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

  save() {
    debugger;
    const blob = new Blob([this.getCode()], { type: 'text/plain' });
    const a = document.createElement('a');
    a.download = this.fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
  }
}
