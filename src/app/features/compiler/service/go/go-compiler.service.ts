import { Injectable } from '@angular/core';
import { ScriptLoaderService } from '../python/py-loader.service';

declare global {
  interface Window {
    Go: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoCompilerService {
  private go: any;
  private initialized = false;

  private stdout: string[] = [];
  private stderr: string[] = [];

  constructor(private loader: ScriptLoaderService) {}

  async init(): Promise<void> {
    if (this.initialized) return;

    if (typeof window === 'undefined') {
      throw new Error('Go compiler runs only in browser');
    }

    // 1️⃣ Load Go WASM runtime
    await this.loader.load('/assets/wasm/wasm_exec.js');

    this.go = new window.Go();

    this.initialized = true;
  }

  async run(): Promise<{ stdout: string; stderr: string }> {
    try {
      await this.init();

      this.stdout = [];
      this.stderr = [];

      // Capture console.log
      const oldLog = console.log;
      console.log = (...args: any[]) => {
        this.stdout.push(args.join(' '));
        oldLog(...args);
      };

      // 2️⃣ Load WASM file
      const response = await fetch('/assets/wasm/main.wasm');
      const bytes = await response.arrayBuffer();

      const result = await WebAssembly.instantiate(bytes, this.go.importObject);

      this.go.run(result.instance);

      console.log = oldLog;

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
