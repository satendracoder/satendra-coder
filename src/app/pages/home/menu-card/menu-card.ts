import { Component, effect, HostListener, inject, Signal } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { TruncateTextPipe } from '../../../shared/pipes/truncate-text/truncate-text-pipe';
import {
  RouterLink,
  RouterLinkActive,
  RouterLinkWithHref,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginPage } from '../../../auth/login-page/login-page';
import { SSafeStorage } from '../../../core/service/global/safe-storage/s-safe-storage';
import { ScButtonComponent } from '../../../shared/components/button/sc-button/sc-button.component';
import { CThemeToggle } from '../../../shared/components/global/c-theme-toggle/c-theme-toggle';
import { STheme } from '../../../core/service/global/theme/s-theme';
import { CallbackDialogComponent } from '../../../shared/components/global/callback-dialog/callback-dialog.component';
import { AvatarPipePipe } from '../../../shared/pipes/avatar/avatar-pipe.pipe';
import { BehaviorSubject } from 'rxjs';

interface MenuItem {
  label: string;
  link?: string;
  hasDropdown: boolean;
  dropdownItems?: any[];
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-menu-card',
  imports: [
    MateriallistModule,
    TruncateTextPipe,
    RouterLink,
    RouterLinkWithHref,
    ScButtonComponent,
    CThemeToggle,
    AvatarPipePipe,
  ],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.scss',
})
export class MenuCard {
  activeDropdown: string | null = null;
  isMobileMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  selectedTheme: string = 'light';
  isDarkTheme: Signal<boolean>;
  avatarUser: any = '';

  readonly dialog = inject(MatDialog);

  constructor(private safestorage: SSafeStorage, private themeService: STheme) {
    const userdata = this.safestorage.getItem('userdata');
    this.avatarUser = userdata;
    if (userdata) {
      this.isLoggedIn = true;
      this.currentUser = {
        name: userdata?.name,
        email: userdata?.email,
      };
      this.closeDropdowns();
    } else {
      this.isLoggedIn = false;
    }

    this.isDarkTheme = this.themeService.isDarkTheme;
    // Reactively update selectedTheme
    effect(() => {
      this.selectedTheme = this.isDarkTheme() ? 'dark' : 'light';
    });
  }

  ngOnInit(): void {}

  menuItems: MenuItem[] = [
    {
      label: 'Grow Learn',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Learn Handbooks',
          link: '/handbooks',
        },
        {
          name: 'DSA Sheets',
          link: '/dsa-sheets',
        },
        {
          name: 'AI Engineer',
          link: '/generative-ai',
        },

        {
          name: 'Practice Mock Tests',
          link: '/mock-tests',
        },
        {
          name: 'Interview Questions',
          link: '/interview',
        },
      ],
    },
  ];

  // Simulate login/logout for demo purposes
  toggleLogin(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.login();
    }
  }

  private login(): void {
    const dialogRef = this.dialog.open(LoginPage, {
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  private logout(): void {
    this.safestorage.removeItem('userdata');
    this.isLoggedIn = false;
    this.currentUser = null;
    this.closeDropdowns();
  }

  toggleDropdown(menuLabel: string): void {
    if (this.isMobileMenuOpen) {
      // Mobile behavior - toggle dropdown
      this.activeDropdown =
        this.activeDropdown === menuLabel ? null : menuLabel;
    } else {
      // Desktop behavior - toggle dropdown
      this.activeDropdown =
        this.activeDropdown === menuLabel ? null : menuLabel;
    }
  }

  closeDropdowns(): void {
    this.activeDropdown = null;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.closeDropdowns();
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.closeDropdowns();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const navItem = target.closest('.nav-item');
    const mobileToggle = target.closest('.mobile-menu-toggle');

    // Don't close dropdown if clicking within the same nav item or mobile toggle
    if (!navItem && !mobileToggle) {
      this.closeDropdowns();
    } else if (navItem && !this.isMobileMenuOpen) {
      // Desktop: close other dropdowns when clicking different nav item
      const clickedItem = navItem
        .querySelector('.nav-link')
        ?.textContent?.trim();
      if (
        clickedItem &&
        this.activeDropdown &&
        this.activeDropdown !== clickedItem
      ) {
        this.activeDropdown = clickedItem;
      }
    }
  }

  // Change theme based on toggle
  onThemeChange(theme: string) {
    this.themeService.setTheme(theme === 'dark'); // 👈 Apply theme
  }

  callBack() {
    this.dialog.closeAll();
    this.dialog.open(CallbackDialogComponent, {
      width: '420px',
      panelClass: 'custom-dialog-container',
    });
  }
}
