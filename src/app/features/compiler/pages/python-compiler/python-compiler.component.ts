import { Component } from '@angular/core';
import { LayoutCompilerComponent } from '../layout-compiler/layout-compiler.component';
import { PythonCompilerService } from '../../service/python/python-compiler.service';

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

  constructor(private python: PythonCompilerService) {}

  async onRun(code: string, layout: LayoutCompilerComponent) {
    debugger;
    layout.setOutput('Running Python...', '');

    const result = await this.python.run(code);
    layout.setOutput(result.stdout, result.stderr);
  }
}
