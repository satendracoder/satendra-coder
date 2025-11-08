import { Component, effect, Signal } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { STheme } from '../../../core/service/global/theme/s-theme';
import { CThemeToggle } from '../../../shared/components/global/c-theme-toggle/c-theme-toggle';

@Component({
  selector: 'app-footer-card',
  standalone: true,
  imports: [MateriallistModule, CThemeToggle],
  templateUrl: './footer-card.html',
  styleUrl: './footer-card.scss',
})
export class FooterCard {
  isDarkTheme!: Signal<boolean>;
  selectedTheme: string = 'light';
  currentYear: number = new Date().getFullYear();

  constructor(public themeService: STheme) {
    this.isDarkTheme = this.themeService.isDarkTheme;

    // Reactively update selectedTheme
    effect(() => {
      this.selectedTheme = this.isDarkTheme() ? 'dark' : 'light';
    });
  }

  onThemeChange(theme: string) {
    this.themeService.setTheme(theme === 'dark'); // 👈 Apply theme
  }
}
