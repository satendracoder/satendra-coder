import { Component } from '@angular/core';
import { TypescriptCompilerService } from '../../service/ts/typescript-compiler.service';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { SSeo } from '../../../../core/service/other/seo/s-seo';

@Component({
  selector: 'app-ts-compiler',
  imports: [LayoutCompilerComponent],
  templateUrl: './ts-compiler.component.html',
  styleUrl: './ts-compiler.component.scss',
})
export class TsCompilerComponent {
  title = 'TypeScript Compiler';
  fileName = 'main.ts';

  defaultCode = `function greet(name: string): string {
  return "Hello " + name;
}

console.log(greet("TypeScript"));
`;

  constructor(
    private tsCompiler: TypescriptCompilerService,
    private seo: SSeo
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initSeo();
  }

  onRun(code: string, layout: LayoutCompilerComponent) {
    const result = this.tsCompiler.run(code);
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
