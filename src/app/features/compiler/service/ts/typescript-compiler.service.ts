import { Injectable } from '@angular/core';
import * as ts from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class TypescriptCompilerService {
  run(code: string): { stdout: string; stderr: string } {
    try {
      let logs: string[] = [];

      // Capture console.log
      const oldLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.join(' '));
        oldLog(...args);
      };

      // ✅ Transpile TS → JS
      const jsCode = ts.transpile(code, {
        target: ts.ScriptTarget.ES2017,
        module: ts.ModuleKind.None,
      });

      // ✅ Execute JS safely
      const fn = new Function(jsCode);
      const result = fn();

      console.log = oldLog;

      if (result !== undefined) {
        logs.push(String(result));
      }

      return {
        stdout: logs.join('\n'),
        stderr: '',
      };
    } catch (err: any) {
      return {
        stdout: '',
        stderr: err.message || err.toString(),
      };
    }
  }
}
