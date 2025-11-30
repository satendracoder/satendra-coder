import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { isPlatformBrowser } from '@angular/common';
import { TruncateTextPipe } from '../../../shared/pipes/truncate-text/truncate-text-pipe';

@Component({
  selector: 'app-courses-card',
  imports: [MateriallistModule, TruncateTextPipe],
  templateUrl: './courses-card.component.html',
  styleUrl: './courses-card.component.scss',
})
export class CoursesCardComponent {
  courses = [
    {
      title: 'HTML & CSS Mastery — Build Beautiful, Responsive Websites',
      desc: 'Learn how to structure, style, and design modern web pages using HTML5 and CSS3. From essential tags to layouts, flexbox, grid, animations, and responsive design — this course takes you from beginner to project-ready.',
      banner: '/assets/images/global/html_courses.png',
      ribbon: 'Coming Soon',
      bestSeller: true,
      cohort: true,
    },
    {
      title: 'JavaScript Zero to Hero — Master the Language of the Web',
      desc: 'A complete JavaScript course that takes you from fundamentals to advanced concepts. Build dynamic and interactive web experiences while understanding DOM manipulation, ES6+, asynchronous JS, APIs, and real-world projects.',
      banner: '/assets/images/global/js_courses.png',
      ribbon: 'Coming Soon',
      bestSeller: false,
      cohort: true,
    },
    {
      title: 'Angular 17+ Complete Guide — From Basics to Advanced Mastery',
      desc: 'A full Angular roadmap covering components, services, routing, forms, RxJS, state management (NgRx), performance optimization, folder structure, and real-world project development. Perfect for beginners and professionals.',
      banner: '/assets/images/global/angular_courses.png',
      bestSeller: true,
      cohort: false,
    },
    {
      title: 'Frontend Engineer Program — Complete Job-Ready Bundle',
      desc: 'A combined training program covering HTML, CSS, JavaScript, Angular, RxJS, Standalone Components, real banking projects, and interview preparation. Everything you need to become a professional frontend engineer.',
      banner: '/assets/images/global/frontend_combo_courses.png',
      ribbon: 'New',
      bestSeller: true,
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
