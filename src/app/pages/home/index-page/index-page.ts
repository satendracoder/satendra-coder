import { Component, inject } from '@angular/core';
import { MenuCard } from '../menu-card/menu-card';
import { BannerCard } from '../banner-card/banner-card';
import { FooterCard } from '../footer-card/footer-card';
import { GlobalContact } from '../../../shared/components/other/global-contact/global-contact';
import { MentorshipCard } from '../mentorship-card/mentorship-card';
import { LearningSection } from '../learning-section/learning-section';
import { FaqCard } from '../faq-card/faq-card';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { SSeo } from '../../../core/service/other/seo/s-seo';
import { LatestBlogCard } from '../latest-blog-card/latest-blog-card';

@Component({
  selector: 'app-index-page',
  imports: [
    BannerCard,
    FooterCard,
    GlobalContact,
    MentorshipCard,
    LearningSection,
    FaqCard,
    MenuCard,
    MateriallistModule,
    LatestBlogCard,
  ],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
})
export class IndexPage {
  private seo = inject(SSeo);

  titleSeo: string =
    'Satendra Coder – Learn Full Stack Development, Generative AI, DSA, and Communication Skills';

  description: string =
    'Satendra Coder is your complete learning hub to master Full Stack Development, Generative AI, DSA, and Communication Skills. Explore hands-on coding tutorials, AI-powered tools, interview preparation, kids-friendly courses, and fintech-focused projects to grow as a modern developer.';

  keywords: string =
    'Satendra Coder, Full Stack Development, Generative AI, Java and Angular tutorials, DSA interview preparation, Fintech engineer learning, AI for developers, Coding for beginners, Computer Science basics, Kids coding courses, Communication skills for developers, English speaking for IT professionals, Free programming eBooks, Learning roadmaps for coders, Satendra Rajput';

  ngOnInit(): void {
    this.seo.updateMeta({
      title: this.titleSeo,
      description: this.description,
      keywords: this.keywords,
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/assets/favicon.ico',
    });
  }
}
