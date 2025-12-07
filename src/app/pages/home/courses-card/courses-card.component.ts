import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { isPlatformBrowser } from '@angular/common';
import { TruncateTextPipe } from '../../../shared/pipes/truncate-text/truncate-text-pipe';
import { CoursesService } from '../../../features/courses/services/courses.service';

@Component({
  selector: 'app-courses-card',
  imports: [MateriallistModule, TruncateTextPipe],
  templateUrl: './courses-card.component.html',
  styleUrl: './courses-card.component.scss',
})
export class CoursesCardComponent {
  courses: any = [];

  currentIndex = 0;
  itemsPerView = 4;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private courseapi: CoursesService
  ) {}

  ngOnInit() {
    this.courses = this.courseapi.courses;
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
