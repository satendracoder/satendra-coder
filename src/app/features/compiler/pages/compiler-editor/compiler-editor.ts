import { Component, Input } from '@angular/core';
import { SCompilers } from '../../service/s-compilers';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-compiler-editor',
  imports: [MateriallistModule],
  templateUrl: './compiler-editor.html',
  styleUrl: './compiler-editor.scss',
})
export class CompilerEditor {
  constructor(private editorService: SCompilers) {}

  @Input() selectedLanguage = 'C++'; // Default language
  code = ''; // Editor content
  fileContent = ''; // Default file content
  lineNumbers: number[] = [];
  fileName: string = 'main.cpp'; // File name displayed in the heading

  ngOnInit(): void {
    this.updateLineNumbers();
    this.editorService.selectedLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.onLanguageChange(language);
    });

    this.editorService.fileContent$.subscribe((content) => {
      this.fileContent = content;
      this.code = content;
      this.updateLineNumbers();
    });
  }

  updateLineNumbers(): void {
    const totalLines = this.code.split('\n').length;
    this.lineNumbers = Array.from({ length: totalLines }, (_, i) => i + 1);
  }

  onCodeInput(): void {
    this.updateLineNumbers();
  }

  onLanguageChange(language: string) {
    //console.log(`Language changed to: ${language}`);
    const defaultCode: { [key: string]: string } = {
      'C++': '#include <iostream>\nint main() {\n\treturn 0;\n}',
      C: '#include <stdio.h>\nint main() {\n\treturn 0;\n}',
      Java: 'public class Main {\n\tpublic static void main(String[] args) {\n\t\t// Code here\n\t}\n}',
      JavaScript: 'console.log("Hello, World!");',
      Python: 'print("Hello, World!")',
      HTML: '<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n</body>\n</html>',
    };
    this.fileContent = defaultCode[language] || '';
  }

  handleFileAction(action: string) {
    if (action === 'new') {
      this.editorService.resetFileContent(); // Clear content
    } else if (action === 'save') {
      this.downloadFile();
    } else if (action === 'open') {
      document.getElementById('fileInput')?.click(); // Trigger file upload
    }
  }

  downloadFile() {
    const blob = new Blob([this.code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.fileName}_code.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
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
