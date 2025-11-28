import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { MatDialog } from '@angular/material/dialog';
import { ViewHandbookComponent } from '../../../shared/components/global/view-handbook/view-handbook.component';

@Component({
  selector: 'app-handbooks-card',
  imports: [MateriallistModule],
  templateUrl: './handbooks-card.component.html',
  styleUrl: './handbooks-card.component.scss',
})
export class HandbooksCardComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private dialog: MatDialog
  ) {}

  handbooks = [
    /* ------------------ HTML HANDBOOK ------------------ */
    {
      title: 'HTML Handbook',
      desc: 'Master HTML5 from basics to semantic elements, forms & SEO structure.',
      banner: '/assets/images/global/html_book.png',
      ribbon: 'New',
      badge: ['Updated'],
      level: 'Beginner → Intermediate',
      lastUpdated: 'Jan 2025',
      details: `A complete guide to HTML5 covering tags, forms, media, semantic structure, SEO-friendly markup, and real project examples. Perfect for beginners and frontend learners.`,
      topics: [
        'HTML Tags & Structure',
        'Forms & Validation',
        'Semantic HTML5',
        'Audio/Video Elements',
        'SEO-Friendly Markup',
        'Tables & Layouts',
        'Mini Projects',
      ],
    },

    /* ------------------ CSS HANDBOOK ------------------ */
    {
      title: 'CSS Handbook',
      desc: 'Learn layouts, flexbox, grid, animations & responsive UI design.',
      banner: '/assets/images/global/css_book.png',
      ribbon: 'Updated',
      badge: ['New'],
      level: 'Beginner → Advanced',
      lastUpdated: 'Jan 2025',
      details: `This handbook includes everything from CSS basics to flexbox, grid, animations, transitions, responsive design, and modern UI patterns.`,
      topics: [
        'Selectors & Box Model',
        'Flexbox & Grid',
        'Animations & Transitions',
        'Responsive Design',
        'CSS Variables',
        'Positioning',
        'Real UI Projects',
      ],
    },

    /* ------------------ JAVASCRIPT HANDBOOK ------------------ */
    {
      title: 'JavaScript Handbook',
      desc: 'Complete JavaScript from basics to advanced with examples.',
      banner: '/assets/images/global/javascript_book.png',
      ribbon: 'New',
      badge: ['Updated'],
      level: 'Beginner → Advanced',
      lastUpdated: 'Jan 2025',
      details: `This handbook covers JavaScript foundations, modern ES6+ features, DOM manipulation, asynchronous programming, OOP, modules, and real-world patterns.`,
      topics: [
        'Variables, Data Types, Operators',
        'Functions & Arrow Functions',
        'Promises & Async/Await',
        'DOM + Events + Event Loop',
        'Objects, Classes & OOP',
        'Modules & Bundling',
        'Interview Questions',
      ],
    },

    /* ------------------ ANGULAR HANDBOOK ------------------ */
    {
      title: 'Angular Handbook',
      desc: 'Angular 18 with Signals, RxJS, architecture & best practices.',
      banner: '/assets/images/global/angular_book.png',
      ribbon: 'New',
      badge: ['Updated'],
      level: 'Beginner → Advanced',
      lastUpdated: 'Jan 2025',
      details: `This handbook explains Angular architecture, components, routing, services, DI, RxJS, Signals, modules, forms, and performance optimization.`,
      topics: [
        'Components & Templates',
        'Standalone Architecture',
        'Routing & Guards',
        'Services & DI',
        'RxJS + Observables',
        'Signals (Angular 18)',
        'State Management',
      ],
    },

    /* ------------------ JAVA HANDBOOK ------------------ */
    {
      title: 'Java OOPs Handbook',
      desc: 'Core Java, OOP, diagrams, patterns & interview prep.',
      banner: '/assets/images/global/java_book.png',
      ribbon: 'Coming Soon',
      badge: ['Handbook'],
      level: 'Beginner → Intermediate',
      lastUpdated: 'Coming March 2025',
      details: `A visual guide to Java OOP concepts with UML diagrams, examples, patterns and interview-focused explanations.`,
      topics: [
        'Classes & Objects',
        'Encapsulation, Abstraction',
        'Inheritance & Polymorphism',
        'Interfaces & Abstract Classes',
        'Exception Handling',
        'Collections Framework',
        'Interview Questions',
      ],
    },

    /* ------------------ SPRING HANDBOOK ------------------ */
    {
      title: 'Spring Boot Handbook',
      desc: 'Spring Boot, REST APIs, JPA, Security & Microservices.',
      banner: '/assets/images/global/spring_book.png',
      ribbon: 'Coming Soon',
      badge: ['Handbook'],
      level: 'Intermediate → Advanced',
      lastUpdated: 'Coming April 2025',
      details: `This handbook covers Spring Boot fundamentals, REST API development, database integration, security, JWT, microservices, and deployment.`,
      topics: [
        'Spring Boot Basics',
        'REST Controllers',
        'Spring Data JPA',
        'Exception Handling',
        'Spring Security + JWT',
        'Microservices Intro',
        'Real Backend Patterns',
      ],
    },

    /* ------------------ DSA HANDBOOK ------------------ */
    // {
    //   title: 'DSA Handbook',
    //   desc: 'Data Structures & Algorithms with JS visuals.',
    //   banner: '/assets/images/global/dsa_book.png',
    //   ribbon: 'New',
    //   badge: ['Updated'],
    //   level: 'Beginner → Advanced',
    //   lastUpdated: 'Jan 2025',
    //   details: `This handbook covers core data structures and algorithms with examples, diagrams, time complexity, and interview patterns.`,
    //   topics: [
    //     'Arrays, Strings',
    //     'Linked List, Stack, Queue',
    //     'Trees, BST, Heaps',
    //     'Graphs & Traversals',
    //     'Sorting & Searching',
    //     'Dynamic Programming',
    //     'Pattern Problems',
    //   ],
    // },

    /* ------------------ AI PROMPTING HANDBOOK ------------------ */
    // {
    //   title: 'AI Prompting Handbook',
    //   desc: 'Learn AI prompting & become a power user.',
    //   banner: '/assets/images/global/ai.png',
    //   ribbon: 'Coming Soon',
    //   badge: ['Handbook'],
    //   level: 'Beginner → Pro',
    //   lastUpdated: 'Coming May 2025',
    //   details: `Learn advanced prompting techniques including system prompts, role prompting, chain-of-thought, multi-step workflows, and AI automation.`,
    //   topics: [
    //     'Prompt Basics',
    //     'Role Prompts',
    //     'System Instructions',
    //     'Chain of Thought',
    //     'Multi-Step Prompts',
    //     'AI Automation',
    //     'Real Use Cases',
    //   ],
    // },
  ];

  currentIndex = 0;
  itemsPerView = 4;

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
        this.itemsPerView = 2;
      } else if (width <= 1024) {
        this.itemsPerView = 2;
      } else {
        this.itemsPerView = 4;
      }
    }
  }

  nextSlide() {
    if (this.currentIndex < this.handbooks.length - this.itemsPerView) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  openViewDialog(item: any) {
    this.dialog.open(ViewHandbookComponent, {
      panelClass: 'view-dialog',
      data: item,
      autoFocus: false,
      disableClose: false,
    });
  }
}
