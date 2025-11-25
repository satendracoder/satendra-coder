import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
} from '@angular/core';
import { MenuCard } from '../../../../../pages/home/menu-card/menu-card';
import { FooterCard } from '../../../../../pages/home/footer-card/footer-card';
import { TutorialHome } from '../tutorial-home/tutorial-home';
import { MateriallistModule } from '../../../../../shared/materiallist/materiallist-module';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TutoralSidebar } from '../tutoral-sidebar/tutoral-sidebar';

@Component({
  selector: 'app-tutorial-layout',
  imports: [
    MenuCard,
    FooterCard,
    TutorialHome,
    MateriallistModule,
    TutoralSidebar,
  ],
  templateUrl: './tutorial-layout.html',
  styleUrl: './tutorial-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialLayout {
  isSidebarOpen = false;
  isTutorialRoute = signal<boolean>(false);

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // check initial load safely
    // this.cdRef.detectChanges();
    if (this.router) {
      const initialUrl = this.router.url.split('?')[0].replace(/\/$/, '');
      this.isTutorialRoute.set(initialUrl === '/tutorials');
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const url = event.urlAfterRedirects.split('?')[0].replace(/\/$/, '');
          this.isTutorialRoute.set(url === '/tutorials');
        });
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSidebarClosed() {
    this.isSidebarOpen = false;
  }
}
