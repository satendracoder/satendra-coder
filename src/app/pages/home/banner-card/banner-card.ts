import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { link } from 'fs';
import { ScButtonComponent } from '../../../shared/components/button/sc-button/sc-button.component';

@Component({
  selector: 'app-banner-card',
  imports: [MateriallistModule],
  templateUrl: './banner-card.html',
  styleUrls: ['./banner-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerCard implements OnInit, OnDestroy {
  items = [
    {
      heading: 'Master HTML, CSS & JavaScript',
      description:
        'Learn the building blocks of the web. Build static websites, dynamic UI, and practice real-world DOM challenges.',
      features: [
        { icon: '🌐', text: 'Frontend Foundation' },
        { icon: '🎨', text: 'CSS Tricks & Layouts' },
        { icon: '🧪', text: 'JS Exercises' },
      ],
      button: 'Start with HTML/CSS/JS',
      link: '/courses/html-css-js',
      codeFilename: 'index.html',
      codeComment: '<!-- Start of your website -->',
      codeKeyword: '<script>',
      className: '',
      mainSignature: '',
      codeLine: 'console.log("Hello, Satendracoder!");',
      output: 'Hello, Satendracoder!',
      toastSuccess: '🟢 HTML/JS rendered!',
      toastComplete: '🏅 First webpage done!',
    },
    {
      heading: 'Master Angular Development',
      description:
        'From components to services, routing to NGRX, learn Angular the right way by building complex SPAs.',
      features: [
        { icon: '⚙️', text: 'Component-Based' },
        { icon: '🔁', text: 'RxJS & NgRx' },
        { icon: '📦', text: 'Modular Architecture' },
      ],
      button: 'Start with Angular',
      link: '/courses/angular',
      codeFilename: 'app.component.ts',
      codeComment: '// Angular root component',
      codeKeyword: 'export class',
      className: 'AppComponent',
      mainSignature: '',
      codeLine: 'title = "Hello, Satendracoder!";',
      output: 'Hello, Satendracoder!',
      toastSuccess: '🟢 Angular app running!',
      toastComplete: '🏅 Angular bootstrapped!',
    },
    {
      heading: 'Master Java + Spring Boot',
      description:
        'Build secure, production-ready APIs using Java, Spring Boot, JPA, and REST.',
      features: [
        { icon: '🚀', text: 'RESTful APIs' },
        { icon: '🔐', text: 'JWT Auth & Security' },
        { icon: '🧩', text: 'Database & JPA' },
      ],
      button: 'Start with Spring Boot',
      link: '/courses/spring-boot',
      codeFilename: 'HelloController.java',
      codeComment: '// Spring Boot Hello API',
      codeKeyword: '@RestController',
      className: 'public class HelloController',
      mainSignature: '@GetMapping("/")',
      codeLine: 'return "Hello, Satendracoder!";',
      output: 'Hello, Satendracoder!',
      toastSuccess: '🟢 API running!',
      toastComplete: '🏅 Java backend complete!',
    },
  ];

  currentItem = this.items[0];
  index = 0;
  private intervalId: any;

  constructor(private cd: ChangeDetectorRef, private zone: NgZone) {}

  ngOnInit(): void {
    // Random index select karo
    this.index = Math.floor(Math.random() * this.items.length);
    this.currentItem = this.items[this.index];

    // Auto change karte rehne ke liye interval
    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.index = (this.index + 1) % this.items.length;
        this.currentItem = this.items[this.index];

        // Force Angular to update the view
        this.zone.run(() => {
          this.cd.markForCheck();
        });
      }, 9000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
