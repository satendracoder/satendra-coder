import { Component, signal } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { GlobalContact } from '../../../../shared/components/other/global-contact/global-contact';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
import { TruncateTextPipe } from '../../../../shared/pipes/truncate-text/truncate-text-pipe';
import { CoursesService } from '../../services/courses.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-course-layout',
  imports: [
    MateriallistModule,
    GlobalContact,
    MenuCard,
    FooterCard,
    TruncateTextPipe,
  ],
  templateUrl: './course-layout.component.html',
  styleUrl: './course-layout.component.scss',
})
export class CourseLayoutComponent {
  isCoursesRoute = signal<boolean>(false);

  searchText: string = '';

  courses: any[] = [];
  currentUrl = signal<string>('');
  urldetails = signal<string>('');

  constructor(private courseapi: CoursesService, private router: Router) {}

  ngOnInit(): void {
    const processUrl = (url: string) => {
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      const segments = cleanUrl.split('/'); // ["", "courses", "angular"]

      const first = segments[1] || '';
      const second = segments[2] || '';

      // If only '/courses' then do NOT show urldetails
      if (first === 'courses' && !second) {
        this.currentUrl.set('courses');
        this.urldetails.set('');
        this.isCoursesRoute.set(true);
      } else {
        this.currentUrl.set(first);
        this.urldetails.set(second);
        this.isCoursesRoute.set(false);
      }
    };

    // Initial load
    processUrl(this.router.url);

    // On route change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        processUrl(event.urlAfterRedirects);
      });

    // Load courses
    this.courses = this.courseapi.courses;
  }

  get filteredCourses() {
    return this.courses.filter((c) =>
      c.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
