import { Injectable } from '@angular/core';
import { link } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses = [
    {
      title: 'HTML & CSS Mastery — Build Beautiful, Responsive Websites',
      desc: 'Learn how to structure, style, and design modern web pages using HTML5 and CSS3. From essential tags to layouts, flexbox, grid, animations, and responsive design — this course takes you from beginner to project-ready.',
      banner: '/assets/images/global/html_courses.png',
      ribbon: 'Coming Soon',
      bestSeller: true,
      cohort: true,
      link: 'html-css-mastery',
    },
    {
      title: 'JavaScript Zero to Hero — Master the Language of the Web',
      desc: 'A complete JavaScript course that takes you from fundamentals to advanced concepts. Build dynamic and interactive web experiences while understanding DOM manipulation, ES6+, asynchronous JS, APIs, and real-world projects.',
      banner: '/assets/images/global/js_courses.png',
      ribbon: 'Coming Soon',
      bestSeller: false,
      cohort: true,
      link: 'javascript-zero-to-hero',
    },
    {
      title: 'Angular 17+ Complete Guide — From Basics to Advanced Mastery',
      desc: 'A full Angular roadmap covering components, services, routing, forms, RxJS, state management (NgRx), performance optimization, folder structure, and real-world project development. Perfect for beginners and professionals.',
      banner: '/assets/images/global/angular_courses.png',
      bestSeller: true,
      cohort: false,
      link: '/angular-complete-guide',
    },
    {
      title: 'Frontend Engineer Program — Complete Job-Ready Bundle',
      desc: 'A combined training program covering HTML, CSS, JavaScript, Angular, RxJS, Standalone Components, real banking projects, and interview preparation. Everything you need to become a professional frontend engineer.',
      banner: '/assets/images/global/frontend_combo_courses.png',
      ribbon: 'New',
      bestSeller: true,
      cohort: false,
      link: 'frontend-combo-package',
    },
  ];
}
