import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  load(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () => reject(`Failed to load ${src}`);

      document.body.appendChild(script);
    });
  }

  async loadCpp(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve((window as any).Module); // Module already loaded
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      script.onload = async () => {
        try {
          const Module = await (window as any).Module();
          resolve(Module);
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = () => reject(`Failed to load ${src}`);

      document.body.appendChild(script);
    });
  }
}
