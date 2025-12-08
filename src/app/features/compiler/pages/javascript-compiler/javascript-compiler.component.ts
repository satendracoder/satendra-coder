import { Component, ElementRef, ViewChild } from '@angular/core';
import { CompilerLayout } from '../../layout/compiler-layout/compiler-layout';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { CompilerService } from '../../service/compiler.service';

@Component({
  selector: 'app-javascript-compiler',
  imports: [MateriallistModule, LayoutCompilerComponent],
  templateUrl: './javascript-compiler.component.html',
  styleUrl: './javascript-compiler.component.scss',
})
export class JavascriptCompilerComponent {
  defaultJS = `console.log("Hello JavaScript");`;

  constructor(private compiler: CompilerService) {}
  onRun(code: string, layout: LayoutCompilerComponent) {
    const result: any = this.compiler.runJS(code);
    layout.setOutput(result, '');
    try {
      let logs: string[] = [];
      const old = console.log;

      console.log = (...args: any[]) => {
        logs.push(args.join(' '));
        old(...args);
      };

      let result = code;

      console.log = old;

      if (result !== undefined) logs.push(String(result));

      layout.setOutput(logs.join('\n'), '');
    } catch (err: any) {
      layout.setOutput('', err.toString());
    }
  }
}
