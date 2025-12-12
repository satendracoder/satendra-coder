import { Component, ElementRef, ViewChild } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { CompilerService } from '../../service/compiler.service';
import { JsCompilerService } from '../../service/js/js-compiler.service';

@Component({
  selector: 'app-javascript-compiler',
  imports: [MateriallistModule, LayoutCompilerComponent],
  templateUrl: './javascript-compiler.component.html',
  styleUrl: './javascript-compiler.component.scss',
})
export class JavascriptCompilerComponent {
  constructor(private js: JsCompilerService) {}

  defaultJS = `// Online Javascript Editor for free
//Write, Edit and Run your Javascript code using JS Online Compiler
console.log("Hello JavaScript");
  `;

  onRun(code: string, layout: LayoutCompilerComponent) {
    debugger;
    console.log(code, layout);

    const result = this.js.run(code);
    layout.setOutput(result.stdout, result.stderr);
    console.log(code, layout);
  }
}
