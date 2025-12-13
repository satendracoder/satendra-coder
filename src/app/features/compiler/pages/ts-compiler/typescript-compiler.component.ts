import { Component } from '@angular/core';
import { TypescriptCompilerService } from '../../service/ts/typescript-compiler.service';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { SSeo } from '../../../../core/service/other/seo/s-seo';

@Component({
  selector: 'app-typescript-compiler',
  imports: [LayoutCompilerComponent],
  templateUrl: './typescript-compiler.component.html',
  styleUrl: './typescript-compiler.component.scss',
})
export class TypescriptCompilerComponent {
  title = 'TypeScript Compiler';
  fileName = 'main.Typescript';

  defaultCode = `function greet(name: string): string {
  return "Hello " + name;
}

console.log(greet("TypeScript"));
`;

  constructor(
    private TypescriptCompiler: TypescriptCompilerService,
    private seo: SSeo
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implemenTypescript OnInit' to the class.
    this.iniseo();
  }

  onRun(code: string, layout: LayoutCompilerComponent) {
    const result = this.TypescriptCompiler.run(code);
    layout.setOutput(result.stdout, result.stderr);
  }

  // This is method for SEO
  private iniseo() {
    this.seo.updateMeta({
      title: 'TypeScript Online Compiler – Run JS Code Online | Satendra Coder',
      description:
        'Run TypeScript code online using Satendra Coder’s TypeScript compiler. Write, execute, and test JS code instantly with a fast, browser-based editor and real-time output.',
      keywords:
        'TypeScript online compiler, js compiler online, run TypeScript online, TypeScript editor online, free TypeScript compiler, execute js code online, TypeScript playground, satendra coder TypeScript compiler',
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/asseTypescript/favicon.ico',
      auther: 'Satendra Rajput (Software Engineer)',
    });
  }
}
