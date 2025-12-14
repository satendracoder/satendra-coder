import { LayoutCompilerComponent } from './../layout-compiler/layout-compiler.component';
import { Component } from '@angular/core';
import { GoCompilerService } from '../../service/go/go-compiler.service';
import { SSeo } from '../../../../core/service/other/seo/s-seo';

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

  constructor(private go: GoCompilerService, private seo: SSeo) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.iniseo();
  }

  async onRun(_: string, layout: LayoutCompilerComponent) {
    layout.setOutput('Running Go program...', '');
    const result = await this.go.run();
    layout.setOutput(result.stdout, result.stderr);
  }

  // This is method for SEO
  private iniseo() {
    this.seo.updateMeta({
      title: 'Go Online Compiler – Run Go Code Online | Satendra Coder',
      description:
        'Test and run Go code online using Satendra Coder’s Go compiler. Practice Golang syntax in a browser-based playground with fast execution and clean output.',
      keywords:
        'go online compiler, golang compiler online, run go code online, go playground online, go wasm compiler, execute golang code online, satendra coder go compiler',
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/asseTypescript/favicon.ico',
      auther: 'Satendra Rajput (Software Engineer)',
    });
  }
}
