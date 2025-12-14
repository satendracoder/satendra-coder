import { Component } from '@angular/core';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { PythonCompilerService } from '../../service/python/python-compiler.service';
import { SSeo } from '../../../../core/service/other/seo/s-seo';

@Component({
  selector: 'app-python-compiler',
  imports: [LayoutCompilerComponent],
  templateUrl: './python-compiler.component.html',
  styleUrl: './python-compiler.component.scss',
})
export class PythonCompilerComponent {
  title = 'Python Compiler';
  fileName = 'main.py';

  defaultCode = `print("Hello Python")

for i in range(1, 6):
    print("Number:", i)
`;

  constructor(private python: PythonCompilerService, private seo: SSeo) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.iniseo();
  }

  async onRun(code: string, layout: LayoutCompilerComponent) {
    debugger;
    layout.setOutput('Running Python...', '');
    const result = await this.python.run(code);
    layout.setOutput(result.stdout, result.stderr);
  }

  // This is method for SEO
  private iniseo() {
    this.seo.updateMeta({
      title: 'Python Online Compiler – Run Python Code Online | Satendra Coder',
      description:
        'Run Python code online using Satendra Coder’s Python compiler. Write and execute Python programs instantly in your browser with real-time output and no setup required.',
      keywords:
        'python online compiler, run python online, python compiler browser, python editor online, execute python code online, free python compiler, python playground, satendra coder python',
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/asseTypescript/favicon.ico',
      auther: 'Satendra Rajput (Software Engineer)',
    });
  }
}
