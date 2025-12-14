import { LayoutCompilerComponent } from './../layout-compiler/layout-compiler.component';
import { Component } from '@angular/core';
import { CppWasmService } from '../../service/cpp/cpp-wasm.service';
import { SSeo } from '../../../../core/service/other/seo/s-seo';

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

  constructor(private cpp: CppWasmService, private seo: SSeo) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.iniseo();
  }
  async onRun(_: string, layout: LayoutCompilerComponent) {
    layout.setOutput('Running C++ WASM...', '');
    const result = await this.cpp.run();
    layout.setOutput(result.stdout, result.stderr);
  }

  // This is method for SEO
  private iniseo() {
    this.seo.updateMeta({
      title:
        'C / C++ Online Compiler – Run C and C++ Code Online | Satendra Coder',
      description:
        'Run C and C++ code online with Satendra Coder’s C/C++ compiler. Practice C and C++ syntax in a browser-based playground with fast execution and real-time output.',
      keywords:
        'c online compiler, c++ online compiler, run c++ code online, cpp compiler online, c++ playground, execute c++ code online, free c++ compiler, satendra coder c++',
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/asseTypescript/favicon.ico',
      auther: 'Satendra Rajput (Software Engineer)',
    });
  }
}
