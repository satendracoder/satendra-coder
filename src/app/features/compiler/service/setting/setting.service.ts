import { effect, Injectable, signal } from '@angular/core';
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';

export interface EditorSettings {
  theme: string;
  autoSuggestion: boolean;
  fontFamily: string;
  fontSize: number;
  tabSize: number;
  lineHeight: number;
}

const DEFAULT_SETTINGS: EditorSettings = {
  theme: 'vs-dark',
  autoSuggestion: false,
  fontFamily: 'Inter, Roboto, Arial, sans-serif',
  fontSize: 14,
  tabSize: 2,
  lineHeight: 20,
};

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private STORAGE_KEY = 'compiler_editor_settings_v2';
  settings = signal<EditorSettings>(this.load() || DEFAULT_SETTINGS);

  constructor(private safe: SSafeStorage) {
    effect(() => {
      const s = this.settings();
      this.safe.setItem(this.STORAGE_KEY, JSON.stringify(s));
    });
  }

  private load(): EditorSettings | null {
    try {
      return JSON.parse(this.safe.getItem(this.STORAGE_KEY) || 'null');
    } catch {
      return null;
    }
  }

  setSettings(partial: Partial<EditorSettings>) {
    this.settings.update((c) => ({ ...c, ...partial }));
  }

  reset() {
    this.settings.set(DEFAULT_SETTINGS);
  }
}
