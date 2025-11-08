import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

function _window(): any {
  return typeof window !== 'undefined' ? window : null;
}

@Injectable({ providedIn: 'root' })
export class SSafeStorage {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: any): void {
    if (this.isBrowser) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (this.isBrowser) {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
      sessionStorage.clear();
    }
  }

  get nativeWindow(): Window | null {
    return this.isBrowser ? _window() : null;
  }
}
