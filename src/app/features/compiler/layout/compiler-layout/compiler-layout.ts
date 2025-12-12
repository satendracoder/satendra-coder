import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { CompilerBanner } from '../../pages/compiler-banner/compiler-banner';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { filter } from 'rxjs';

@Component({
  selector: 'app-compiler-layout',
  imports: [
    RouterOutlet,
    MateriallistModule,
    FooterCard,
    MenuCard,
    CompilerBanner,
    // CompilerList,
  ],
  templateUrl: './compiler-layout.html',
  styleUrl: './compiler-layout.scss',
})
export class CompilerLayout {
  isCompilerRoute = signal<boolean>(false);

  currentUrl = signal<string>('');
  urldetails = signal<string>('');

  constructor(public router: Router) {}

  languages = [
    {
      name: 'JavaScript',
      icon: '/assets/icons/web/js.svg',
      desc: 'Popular language for web development.',
      link: '/compiler/javascript-compiler',
    },
    {
      name: 'Python',
      icon: '/assets/icons/program/python.svg',
      desc: 'Easy-to-learn general purpose language.',
      link: '/compiler/python-compiler',
    },
    {
      name: 'TypeScript',
      icon: '/assets/icons/web/typescript.svg',
      desc: 'Superset of JavaScript with types.',
      link: '/compiler/typescript-compiler',
    },
    {
      name: 'C++',
      icon: '/assets/icons/program/cplusplus.svg',
      desc: 'High-performance compiled language.',
      link: '/compiler/cpp-compiler',
    },
    {
      name: 'Go',
      icon: '/assets/icons/program/go.svg',
      desc: 'Fast, concurrent programming language.',
      link: '/compiler/go-compiler',
    },
  ];

  ngOnInit(): void {
    const processUrl = (url: string) => {
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      const segments = cleanUrl.split('/'); // ["", "courses", "angular"]

      const first = segments[1] || '';
      const second = segments[2] || '';

      // If only '/courses' then do NOT show urldetails
      if (first === 'compiler' && !second) {
        this.currentUrl.set('compiler');
        this.urldetails.set('');
        this.isCompilerRoute.set(true);
      } else {
        this.currentUrl.set(first);
        this.urldetails.set(second);
        this.isCompilerRoute.set(false);
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
  }

  goToRedirect(url: string) {
    this.router.navigate([url]);
  }
}
