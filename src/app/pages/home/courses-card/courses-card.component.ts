import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-courses-card',
  imports: [MateriallistModule],
  templateUrl: './courses-card.component.html',
  styleUrl: './courses-card.component.scss',
})
export class CoursesCardComponent {
  courses = [
    {
      title: 'Spring Boot 0 to 100 Cohort 4.0 [AI + DevOps]',
      desc: 'Upgraded with Spring AI and DevOps! You will master Spring Boot, Spring AI, Microservices...',
      banner: '/assets/images/global/jj.png',
      ribbon: 'Coming Soon',
      bestSeller: true,
      cohort: true,
    },
    {
      title: 'Angular 17 Zero to Mastery',
      desc: 'Routing, RxJS, Signals, Standalone Components.',
      banner: '/assets/images/global/angu.png',
      ribbon: 'Coming Soon',
      bestSeller: false,
      cohort: true,
    },
    {
      title: 'Java + DSA Interview Prep',
      desc: 'Master Java + DSA with 250 problems + mock interviews.',
      banner: '/assets/images/global/java.png',
      bestSeller: true,
      cohort: false,
    },
    {
      title: 'Full Stack Developer Roadmap',
      desc: 'HTML, CSS, JS, Angular, Java, Spring Boot, DevOps.',
      banner: '/assets/images/global/fullstack.png',
      ribbon: 'New',
      bestSeller: false,
      cohort: false,
    },
    {
      title: 'Full Stack Developer Roadmap',
      desc: 'HTML, CSS, JS, Angular, Java, Spring Boot, DevOps.',
      banner: '/assets/images/global/fullstack.png',
      ribbon: 'New',
      bestSeller: false,
      cohort: false,
    },
  ];

  currentIndex = 0;
  itemsPerView = 4;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.updateItemsPerView();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerView();
  }

  updateItemsPerView() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width <= 480) {
        this.itemsPerView = 1;
      } else if (width <= 600) {
        this.itemsPerView = 1;
      } else if (width <= 1024) {
        this.itemsPerView = 2;
      } else {
        this.itemsPerView = 4;
      }
    }
  }

  nextSlide() {
    if (this.currentIndex < this.courses.length - this.itemsPerView) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
