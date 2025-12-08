import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CompilerService {
  runJS(code: string): Promise<any> {
    return new Promise((resolve) => {
      try {
        const logs: string[] = [];
        const original = console.log;

        console.log = (...args: any[]) => {
          logs.push(args.join(' '));
          original.apply(console, args);
        };

        const result = new Function(code)();
        console.log = original;

        resolve({ stdout: logs.join('\n') || String(result), stderr: null });
      } catch (err: any) {
        resolve({ stdout: null, stderr: err.message });
      }
    });
  }

  async runTS(code: string): Promise<any> {
    try {
      const ts = await import('typescript');
      const outputJS = ts.transpileModule(code, {
        compilerOptions: { module: ts.ModuleKind.ES2020 },
      }).outputText;

      return this.runJS(outputJS);
    } catch (err: any) {
      return { stdout: null, stderr: err.message };
    }
  }
}
