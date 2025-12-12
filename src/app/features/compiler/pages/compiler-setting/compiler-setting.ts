import { Component, effect } from '@angular/core';
import { STheme } from '../../../../core/service/global/theme/s-theme';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { Dialog } from '@angular/cdk/dialog';
import {
  EditorSettings,
  SettingService,
} from '../../service/setting/setting.service';

@Component({
  selector: 'app-compiler-setting',
  imports: [MateriallistModule],
  templateUrl: './compiler-setting.html',
  styleUrl: './compiler-setting.scss',
})
export class CompilerSetting {
  settings!: EditorSettings;

  local = {
    autoSuggestion: true,
    fontFamily: '',
    fontSize: 14,
    tabSize: 2,
    lineHeight: 20,
  };

  fontOptions = [
    'Inter, Roboto, Arial, sans-serif',
    'Roboto Mono, monospace',
    'Fira Code, monospace',
    'Source Sans Pro, sans-serif',
  ];

  constructor(private themeService: SettingService, private dialog: Dialog) {
    effect(() => {
      const s = this.themeService.settings();
      this.settings = s;
      this.local.autoSuggestion = s.autoSuggestion;
      this.local.fontFamily = s.fontFamily;
      this.local.fontSize = s.fontSize;
      this.local.tabSize = s.tabSize;
      this.local.lineHeight = s.lineHeight;
    });
  }

  ngOnInit(): void {}

  applyLive() {
    this.themeService.setSettings({ ...this.local });
  }

  onReset() {
    this.themeService.reset();
  }

  onSave() {
    this.applyLive();
    this.dialog.closeAll();
  }

  close() {
    this.dialog.closeAll();
  }
}
