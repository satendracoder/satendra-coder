import { LayoutCompilerComponent } from './../layout-compiler/layout-compiler.component';
import { Component } from '@angular/core';
import { CppWasmService } from '../../service/cpp/cpp-wasm.service';

@Component({
  selector: 'app-cpp-compiler',
  imports: [LayoutCompilerComponent],
  templateUrl: './cpp-compiler.component.html',
  styleUrl: './cpp-compiler.component.scss',
})
export class CppCompilerComponent {
  title = 'C / C++ Compiler (Demo)';
  fileName = 'main.cpp';

  defaultCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello C++" << endl;
    return 0;
}
`;

  constructor(private cpp: CppWasmService) {}

  async onRun(_: string, layout: LayoutCompilerComponent) {
    layout.setOutput('Running C++ WASM...', '');

    const result = await this.cpp.run();
    layout.setOutput(result.stdout, result.stderr);
  }
}
