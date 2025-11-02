import { Component, HostListener, inject } from '@angular/core';
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
  ],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.scss',
})
export class MenuCard {
  activeDropdown: string | null = null;
  isMobileMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: User | null = null;

  readonly dialog = inject(MatDialog);

  constructor(private safestorage: SSafeStorage) {
    const userdata = this.safestorage.getItem('userdata');
    if (userdata) {
      this.isLoggedIn = true;
      this.currentUser = {
        name: userdata?.name,
        email: userdata?.email,
        avatar: this.getInitials(userdata?.name),
      };
      this.closeDropdowns();
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {}

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  }

  menuItems: MenuItem[] = [
    {
      label: 'Features',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Learn Tutorials',
          link: '/tutorials',
        },
        {
          name: 'Generative AI',
          link: '/ai',
        },
        {
          name: 'Interview Questions',
          link: '/interview',
        },
        {
          name: 'Communication Skills',
          link: '/communication',
        },
        {
          name: 'DSA & Algorithms',
          link: '/dsa',
        },
      ],
    },

    {
      label: 'Resources ',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'eBooks Library',
          link: '/ebook',
        },
        {
          name: 'Kids Learning',
          link: '/kids',
        },

        {
          name: 'Webinars & Events',
          link: '/blog',
        },
        {
          name: 'Become a Member',
          link: '/become-a-member',
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
      console.log(`Dialog result: ${result}`);
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
}
