import { Component, ElementRef, HostListener } from '@angular/core';
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
  AllheaderData: any = ''; // @_header set menu

  constructor(
    private elementRef: ElementRef,
    private _router: Router,
    private dialog: MatDialog,
    private editorService: SCompilers
  ) {
    const navigation = this._router.getCurrentNavigation();
    this.AllheaderData = navigation?.extras.state?.['data'];
    //console.log(this.AllheaderData);
  }

  ngOnInit(): void {}

  // @_Open Settings Modal
  openEditorSettings() {
    debugger;
    this.dialog.open(CompilerSetting, {
      width: '600px',
    });
  }

  // @_Close Dropdown
  closeDropdown(event: string): void {
    debugger;
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

  isLanguageDropdownOpen = false;
  isFileDropdownOpen = false;
  selectedLanguage = 'C++'; // Default language

  toggleDropdown(type: string) {
    if (type === 'language') {
      this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
      this.isFileDropdownOpen = false;
    } else if (type === 'file') {
      this.isFileDropdownOpen = !this.isFileDropdownOpen;
      this.isLanguageDropdownOpen = false;
    }
  }

  // @_Get Data from Click Methods
  selectOption(option: string) {
    this.selectedLanguage = option;
    this.editorService.setSelectedLanguage(option); // Notify the editor
    this.isLanguageDropdownOpen = false;
  }

  newFile() {
    this.editorService.resetFileContent(); // Clear editor content
    this.isFileDropdownOpen = false;
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        this.editorService.setFileContent(content); // Update editor content
      };
      reader.readAsText(file);
    }
    this.isFileDropdownOpen = false;
  }

  saveFile() {
    this.editorService.fileContent$.subscribe((content) => {
      if (content.trim() === '') {
        alert('The file is empty. Please add some content before saving.');
        return;
      }
      const blob = new Blob([content], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${this.selectedLanguage}.txt`;
      a.click();
    });
    this.isFileDropdownOpen = false;
  }
}
