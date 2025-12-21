import { Component, inject } from '@angular/core';
import { MenuCard } from '../menu-card/menu-card';
import { BannerCard } from '../banner-card/banner-card';
import { FooterCard } from '../footer-card/footer-card';
import { MentorshipCard } from '../mentorship-card/mentorship-card';
import { LearningSection } from '../learning-section/learning-section';
import { FaqCard } from '../faq-card/faq-card';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { SSeo } from '../../../core/service/other/seo/s-seo';
import { LatestBlogCard } from '../latest-blog-card/latest-blog-card';
import { WhoIAmComponent } from '../../../shared/components/global/who-i-am/who-i-am.component';
import { SSafeStorage } from '../../../core/service/global/safe-storage/s-safe-storage';
import { CoursesCardComponent } from '../courses-card/courses-card.component';
import { HandbooksCardComponent } from '../handbooks-card/handbooks-card.component';

@Component({
  selector: 'app-index-page',
  imports: [
    BannerCard,
    FooterCard,
    MentorshipCard,
    LearningSection,
    MenuCard,
    MateriallistModule,
    LatestBlogCard,
    WhoIAmComponent,
    CoursesCardComponent,
    HandbooksCardComponent,
    FaqCard,
  ],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
})
export class IndexPage {
  private seo = inject(SSeo);
  private safe = inject(SSafeStorage);
  showWhoIAm = false;

  ngOnInit(): void {
    this.initSeo();
    this.handleWhoIAmPopup();
  }

  private initSeo() {
    this.seo.updateMeta({
      title:
        'Satendra Coder – Learn Full Stack Development, AI Engineer, DSA, and Communication Skills',
      description:
        'Satendra Coder is your complete learning hub to master Full Stack Development, AI Engineer, DSA, and Communication Skills.',
      keywords:
        'Satendra Coder, Full Stack Development, AI Engineer, Angular, Java, DSA, Fintech, Coding, Satendra Rajput',
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/assets/favicon.ico',
    });
  }

  private handleWhoIAmPopup(): void {
    const popupShown = this.safe.getItem('whoAmShown');
    if (!popupShown) {
      this.showWhoIAm = true;
      this.safe.setItem('whoAmShown', 'true');
    } else {
      this.showWhoIAm = false;
    }
  }

  closeWhoIAm(): void {
    this.showWhoIAm = false;
  }
}
