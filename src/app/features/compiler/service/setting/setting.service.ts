import { effect, Injectable, signal } from '@angular/core';

export interface EditorSettings {
  autoSuggestion: boolean;
  fontFamily: string;
  fontSize: number;
  tabSize: number;
  lineHeight: number;
}

const DEFAULT_SETTINGS: EditorSettings = {
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

  constructor() {
    effect(() => {
      const s = this.settings();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(s));
    });
  }

  private load(): EditorSettings | null {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
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
