import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsCompilerService {
  run(code: string): { stdout: string; stderr: string } {
    try {
      let logs: string[] = [];

      const oldLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.join(' '));
        oldLog(...args);
      };

      // SAFEST ALTERNATIVE TO eval()
      const fn = new Function(code);
      const result = fn();

      console.log = oldLog;

      if (result !== undefined) logs.push(String(result));

      return { stdout: logs.join('\n'), stderr: '' };
    } catch (err: any) {
      return { stdout: '', stderr: err.toString() };
    }
  }
}
