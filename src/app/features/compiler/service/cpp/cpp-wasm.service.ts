import { Injectable } from '@angular/core';
import loader from '@monaco-editor/loader';

@Injectable({
  providedIn: 'root',
})
export class CppWasmService {
  private Module: any;

  async run(): Promise<{ stdout: string; stderr: string }> {
    try {
      let output: string[] = [];
      const oldLog = console.log;
      console.log = (...args: any[]) => {
        output.push(args.join(' '));
        oldLog(...args);
      };

      if (!this.Module) {
        this.Module = await loader({
          locateFile: (file: string) => `/assets/cpp/${file}`,
        });
      }

      if (!this.Module._run) {
        throw new Error('C++ WASM not initialized');
      }

      this.Module._run();
      console.log = oldLog;

      return { stdout: output.join('\n'), stderr: '' };
    } catch (err: any) {
      return { stdout: '', stderr: err.message || String(err) };
    }
  }
}
