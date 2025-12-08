import { Injectable } from '@angular/core';

declare const loadPyodide: any;

@Injectable({ providedIn: 'root' })
export class PythonRunnerService {
  pyodide: any = null;

  async init() {
    if (this.pyodide) return this.pyodide;

    this.pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });

    return this.pyodide;
  }

  async runPython(code: string) {
    try {
      const py = await this.init();
      const result = await py.runPythonAsync(code);
      return { stdout: String(result), stderr: null };
    } catch (err: any) {
      return { stdout: null, stderr: err.message };
    }
  }
}
