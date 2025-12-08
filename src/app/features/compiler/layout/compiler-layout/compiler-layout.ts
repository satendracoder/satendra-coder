import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { CompilerBanner } from '../../pages/compiler-banner/compiler-banner';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { link } from 'fs';

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

  goToRedirect(url: string) {
    this.router.navigate([url]);
  }
}
