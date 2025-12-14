import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { EditorComponent } from '../../layout/editor/editor.component';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { OutputComponent } from '../../layout/output/output.component';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CompilerSetting } from '../compiler-setting/compiler-setting';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-compiler',
  imports: [MateriallistModule, EditorComponent, OutputComponent],
  templateUrl: './layout-compiler.component.html',
  styleUrl: './layout-compiler.component.scss',
})
export class LayoutCompilerComponent {
  @Input() title: string = 'Compiler';
  @Input() language: string = 'javascript'; // DYNAMIC EDITOR LANGUAGE
  @Input() defaultCode: string = ''; // DYNAMIC DEFAULT CODE

  @Output() onRun = new EventEmitter<string>(); // send code to page
  @Output() onSave = new EventEmitter<void>();

  @ViewChild(EditorComponent) editor!: EditorComponent;

  // Route
  currentUrl = signal<string>('');
  urldetails = signal<string>('');

  stdout: string = '';
  stderr: string = '';

  // resize
  isResizing = false;
  startX = 0;
  leftWidth = 0;

  constructor(private dialog: Dialog, private router: Router) {}

  ngOnInit(): void {
    this.selectedLang = this.router.url;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const processUrl = (url: string) => {
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      const segments = cleanUrl.split('/'); // ["", "courses", "angular"]

      const first = segments[1] || '';
      const second = segments[2] || '';

      // If only '/courses' then do NOT show urldetails
      if (first === 'compiler' && !second) {
        this.currentUrl.set('compiler');
        this.urldetails.set('');
      } else {
        this.currentUrl.set(first);
        this.urldetails.set(second);
      }
    };

    // Initial load
    processUrl(this.router.url);

    // On route change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        processUrl(event.urlAfterRedirects);
      });
  }

  handleUpload(event: any) {
    const file = event.target.files?.[0];
    if (file) this.upload(file);
  }

  // Change Language
  selectedLang = '';

  onLanguageChange(event: Event) {
    const route = (event.target as HTMLSelectElement).value;
    if (route) {
      this.router.navigateByUrl(route);
      // ngModel already bound, so select dikhega
    }
  }

  run() {
    const code = this.editor.getCode();
    this.onRun.emit(code);
  }

  setOutput(stdout: string, stderr: string = '') {
    this.stdout = stdout;
    this.stderr = stderr;
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

  settingOpen() {
    this.dialog.open(CompilerSetting);
  }
}
