import { Component } from '@angular/core';
import { STheme } from '../../../../core/service/global/theme/s-theme';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-compiler-setting',
  imports: [MateriallistModule],
  templateUrl: './compiler-setting.html',
  styleUrl: './compiler-setting.scss',
})
export class CompilerSetting {
  isDarkTheme: boolean = false;
  constructor(private themeService: STheme) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  isDarkModeMethod() {
    debugger;
    this.themeService.isDarkTheme();
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  onReset() {}

  onSave() {
    //console.log('Settings saved:');
  }
}
