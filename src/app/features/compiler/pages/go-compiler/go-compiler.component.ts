import { LayoutCompilerComponent } from './../layout-compiler/layout-compiler.component';
import { Component } from '@angular/core';
import { GoCompilerService } from '../../service/go/go-compiler.service';

@Component({
  selector: 'app-go-compiler',
  imports: [LayoutCompilerComponent],
  templateUrl: './go-compiler.component.html',
  styleUrl: './go-compiler.component.scss',
})
export class GoCompilerComponent {
  title = 'Go Compiler';
  fileName = 'main.go';

  defaultCode = `package main

import "fmt"

func main() {
    fmt.Println("Hello Go")
}
`;

  constructor(private go: GoCompilerService) {}

  async onRun(_: string, layout: LayoutCompilerComponent) {
    layout.setOutput('Running Go program...', '');
    const result = await this.go.run();
    layout.setOutput(result.stdout, result.stderr);
  }
}
