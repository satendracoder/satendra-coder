import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CompilerSetting } from '../../compiler-setting/compiler-setting';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompilerHeader } from '../../compiler-header/compiler-header';
import { MateriallistModule } from '../../../../../shared/materiallist/materiallist-module';
import { SCompilers } from '../../../service/s-compilers';
import { CompilerEditor } from '../../compiler-editor/compiler-editor';

@Component({
  selector: 'app-html-compiler',
  imports: [CompilerHeader, MateriallistModule, CompilerEditor],
  templateUrl: './html-compiler.html',
  styleUrl: './html-compiler.scss',
})
export class HtmlCompiler {
  currentLanguage: string = 'JavaScript';
  output: string = '';
  AllCompilersData: any = '';
  @Input() selectedLanguage = 'C++'; // Default language
  code = ''; // Editor content
  fileContent = ''; // Default file content
  lineNumbers: number[] = [];
  fileName: string = 'main.cpp'; // File name displayed in the heading

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private _router: Router,
    private meta: Meta,
    private title: Title,
    private dialog: MatDialog,
    private editorService: SCompilers
  ) {
    const navigation = this._router.getCurrentNavigation();
    this.AllCompilersData = navigation?.extras.state?.['data'];
    //console.log(this.AllCompilersData);
  }

  onLanguageChange(lang: string) {
    this.currentLanguage = lang;
  }

  isDragging: boolean = false;
  startX: number = 0;
  startWidthLeft: number = 0;
  startWidthRight: number = 0;

  @ViewChild('divider') divider: ElementRef | undefined;

  ngOnInit(): void {
    this.setPageTitleAndMeta();
  }

  ngAfterViewInit(): void {
    const dividerElement = this.divider?.nativeElement;
    dividerElement?.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    const leftPart = document.querySelector('.left-part') as HTMLElement;
    const rightPart = document.querySelector('.right-part') as HTMLElement;

    this.startWidthLeft = leftPart.getBoundingClientRect().width;
    this.startWidthRight = rightPart.getBoundingClientRect().width;

    // Attach mousemove and mouseup listeners to the document
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const leftPart = document.querySelector('.left-part') as HTMLElement;
    const rightPart = document.querySelector('.right-part') as HTMLElement;

    // Calculate new widths for both parts based on mouse movement
    const newWidthLeft = this.startWidthLeft + (event.clientX - this.startX);
    const newWidthRight = this.startWidthRight - (event.clientX - this.startX);

    // Ensure the widths don't go below a certain limit (e.g., 100px)
    if (newWidthLeft > 100 && newWidthRight > 100) {
      leftPart.style.width = `${newWidthLeft}px`;
      rightPart.style.width = `${newWidthRight}px`;
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  isLanguageDropdownOpen = false;
  isFileDropdownOpen = false;
  //selectedLanguage = 'C++'; // Default selected value

  toggleDropdown(type: string) {
    if (type === 'language') {
      this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
      this.isFileDropdownOpen = false; // Close other dropdown
    } else if (type === 'file') {
      this.isFileDropdownOpen = !this.isFileDropdownOpen;
      this.isLanguageDropdownOpen = false; // Close other dropdown
    }
  }

  selectOption(option: string) {
    // console.log(`Selected: ${option}`);
    this.selectedLanguage = option;
    // Close all dropdowns after selecting an option
    this.isLanguageDropdownOpen = false;
    this.isFileDropdownOpen = false;
  }

  closeDropdown(event: string): void {
    if (event === 'language') {
      this.isLanguageDropdownOpen = false;
    } else if (event === 'file') {
      this.isFileDropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isLanguageDropdownOpen = false;
      this.isFileDropdownOpen = false;
    }
  }

  onOutputChange(output: string) {
    this.output = output;
  }

  // Open Settings Modal
  openEditorSettings() {
    this.dialog.open(CompilerSetting, {
      width: '600px',
    });
  }

  setPageTitleAndMeta(): void {
    // Set the title of the page
    this.title.setTitle(this.AllCompilersData?.title);
    // Add or update meta tags
    this.meta.updateTag({
      name: 'description',
      content: this.AllCompilersData?.description,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: this.AllCompilersData?.keywords,
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'Founder & CTO',
      content: 'Satendra Rajput(SDE)',
    });
    this.meta.updateTag({ name: 'Co-Founder', content: 'Arslan Shahid' });
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.code = reader.result as string;
        this.editorService.setFileContent(this.code); // Notify service
      };
      reader.readAsText(file);
    }
  }
}
