import { Component, ElementRef, ViewChild } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { CompilerService } from '../../service/compiler.service';
import { JsCompilerService } from '../../service/js/js-compiler.service';
import { SSeo } from '../../../../core/service/other/seo/s-seo';

@Component({
  selector: 'app-javascript-compiler',
  imports: [MateriallistModule, LayoutCompilerComponent],
  templateUrl: './javascript-compiler.component.html',
  styleUrl: './javascript-compiler.component.scss',
})
export class JavascriptCompilerComponent {
  constructor(private js: JsCompilerService, private seo: SSeo) {}

  defaultJS = `// Online Javascript Editor for free
//Write, Edit and Run your Javascript code using JS Online Compiler
console.log("Hello JavaScript");
  `;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initSeo();
  }

  onRun(code: string, layout: LayoutCompilerComponent) {
    const result = this.js.run(code);
    layout.setOutput(result.stdout, result.stderr);
  }

  // This is method for SEO
  private initSeo() {
    this.seo.updateMeta({
      title: 'JavaScript Online Compiler – Run JS Code Online | Satendra Coder',
      description:
        'Run JavaScript code online using Satendra Coder’s JavaScript compiler. Write, execute, and test JS code instantly with a fast, browser-based editor and real-time output.',
      keywords:
        'javascript online compiler, js compiler online, run javascript online, javascript editor online, free javascript compiler, execute js code online, javascript playground, satendra coder javascript compiler',
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/assets/favicon.ico',
      auther: 'Satendra Rajput (Software Engineer)',
    });
  }
}
