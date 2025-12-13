import { Injectable } from '@angular/core';
import { ScriptLoaderService } from './py-loader.service';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PythonCompilerService {
  private pyodide: any = null;
  private loading = false;

  private stdout: string[] = [];
  private stderr: string[] = [];

  constructor(private loader: ScriptLoaderService) {}

  private async init(): Promise<void> {
    // 🔒 SSR / safety guard
    if (typeof window === 'undefined') {
      throw new Error('Python compiler runs only in browser');
    }

    if (this.pyodide || this.loading) return;

    this.loading = true;

    // 1️⃣ Load Pyodide script
    await this.loader.load(
      'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js'
    );

    // 2️⃣ Ensure function exists
    if (!window.loadPyodide) {
      throw new Error('Pyodide failed to load');
    }

    // 3️⃣ Init pyodide
    this.pyodide = await window.loadPyodide({
      stdout: (msg: string) => this.stdout.push(msg),
      stderr: (msg: string) => this.stderr.push(msg),
    });

    this.loading = false;
  }

  async run(code: string): Promise<{ stdout: string; stderr: string }> {
    try {
      await this.init();

      if (!this.pyodide) {
        throw new Error('Python runtime not initialized');
      }

      this.stdout = [];
      this.stderr = [];

      await this.pyodide.runPythonAsync(code);

      return {
        stdout: this.stdout.join('\n'),
        stderr: this.stderr.join('\n'),
      };
    } catch (err: any) {
      return {
        stdout: '',
        stderr: err.message || String(err),
      };
    }
  }
}
