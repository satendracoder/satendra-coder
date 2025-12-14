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
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';
import { STheme } from '../../../../core/service/global/theme/s-theme';

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
    private themeService: SettingService,
    private safe: SSafeStorage,
    private theme: STheme
  ) {
    effect(() => {
      const s = this.themeService.settings();
      const isDark = this.theme.isDarkTheme();
      if (isDark === true) {
        s.theme = 'vs-light';
      } else {
        s.theme = 'vs-dark';
      }
      this.local.theme = s.theme;
      this.settings = s;
      this.local.autoSuggestion = s.autoSuggestion;
      this.local.fontFamily = s.fontFamily;
      this.local.fontSize = s.fontSize;
      this.local.tabSize = s.tabSize;
      this.local.lineHeight = s.lineHeight;
      // 🔥 LIVE UPDATE MONACO
      if (this.editor) {
        this.updateEditorSettings();
      }
    });
  }

  // Setting card
  settings!: EditorSettings;

  local = {
    theme: 'vs-dark',
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
    if (this.language === 'javascript') {
      this.fileName = 'index.js';
    } else if (this.language === 'typescript') {
      this.fileName = 'index.ts';
    } else if (this.language === 'python') {
      this.fileName = 'main.py';
    } else if (this.language === 'cpp') {
      this.fileName = 'main.cpp';
    } else if (this.language === 'go') {
      this.fileName = 'main.go';
    }
  }

  @Output() codeChange = new EventEmitter<string>();

  async ngAfterViewInit() {
    const monaco = await loader.init();

    this.editor = monaco.editor.create(this.editorRef.nativeElement, {
      value: this.value,
      language: this.language,
      theme: this.local.theme,
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

    const getTheme = this.safe.getItem('isDarkTheme');

    console.log(getTheme);
    if (getTheme === 'true') {
      this.local.theme = 'vs-light';
    } else {
      this.local.theme = 'vs-dark';
    }
    this.editor.updateOptions({
      theme: this.local.theme,
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
    return this.editor.getValue();
  }

  // Parent can set code
  setCode(v: string) {
    this.editor.setValue(v);
  }

  save() {
    const blob = new Blob([this.getCode()], { type: 'text/plain' });
    const a = document.createElement('a');
    a.download = this.fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
  }
}
