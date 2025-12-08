import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WasmRunnerService {
  async runCpp(): Promise<any> {
    try {
      const wasm = await WebAssembly.instantiateStreaming(
        fetch('/assets/cpp/main.wasm')
      );
      const result: any = wasm.instance.exports['main'];
      return { stdout: String(result), stderr: null };
    } catch (err: any) {
      return { stdout: null, stderr: err.message };
    }
  }

  async runGo(): Promise<any> {
    try {
      const go = new (window as any).Go();
      const wasm = await WebAssembly.instantiateStreaming(
        fetch('/assets/go/main.wasm'),
        go.importObject
      );
      go.run(wasm.instance);
      return { stdout: 'Go program executed!', stderr: null };
    } catch (err: any) {
      return { stdout: null, stderr: err.message };
    }
  }
}
