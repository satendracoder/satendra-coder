import { Component, inject } from '@angular/core';
import { SSeo } from '../../../core/service/other/seo/s-seo';
import { Router, RouterLink } from '@angular/router';
import { GlobalContact } from '../../../shared/components/other/global-contact/global-contact';
import { FooterCard } from '../../home/footer-card/footer-card';
import { MenuCard } from '../../home/menu-card/menu-card';
import { ToastService } from 'sc-angular-toastify';
import { SAskme } from '../../../core/service/global/askme/s-askme';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { ScButtonComponent } from '../../../shared/components/button/sc-button/sc-button.component';
import { MatDialog } from '@angular/material/dialog';
import { BecomeMember } from '../../../shared/components/other/become-member/become-member';

@Component({
  selector: 'app-c-about-us',
  imports: [
    MateriallistModule,
    GlobalContact,
    FooterCard,
    MenuCard,
    MateriallistModule,
    ScButtonComponent,
  ],
  templateUrl: './c-about-us.html',
  styleUrl: './c-about-us.scss',
})
export class CAboutUs {
  private seo = inject(SSeo);
  private route = inject(Router);
  private toaster = inject(ToastService);
  private sAskapi = inject(SAskme);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.seo.updateMeta({
      title: 'About Satendra Coder',
      description:
        'Satendra Coder is a Java & Angular expert, corporate trainer, and career mentor with 3+ years of experience, guiding 500+ students in IT growth.',
      keywords:
        'DSA Mentor System Design Trainer Full Stack Developer Trainer Microservices Expert IT Career Guidance Programming Coach Online Coding Platform',
      url: 'https://satendracoder.com/invite-satendra',
      image: 'https://satendracoder.com/assets/cover-image.png',
    });
  }

  inviteBack() {
    this.dialog.closeAll();
    this.dialog.open(BecomeMember);
  }
}
