import { Component, inject } from '@angular/core';
import { SSeo } from '../../../core/service/other/seo/s-seo';
import { Router, RouterLink } from '@angular/router';
import { GlobalContact } from '../../../shared/components/other/global-contact/global-contact';
import { FooterCard } from '../../home/footer-card/footer-card';
import { TestimonialsComponent } from '../../home/testimonials/testimonials.component';
import { MenuCard } from '../../home/menu-card/menu-card';
import { NgForm } from '@angular/forms';
import { ToastService } from 'sc-angular-toastify';
import { SAskme } from '../../../core/service/global/askme/s-askme';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { LearningSection } from '../../home/learning-section/learning-section';

@Component({
  selector: 'app-c-about-us',
  imports: [
    RouterLink,
    GlobalContact,
    FooterCard,
    TestimonialsComponent,
    MenuCard,
    MateriallistModule,
  ],
  templateUrl: './c-about-us.html',
  styleUrl: './c-about-us.scss',
})
export class CAboutUs {
  private seo = inject(SSeo);
  private route = inject(Router);
  private toaster = inject(ToastService);
  private sAskapi = inject(SAskme);

  memberData = {
    name: '',
    email: '',
    mobile: '',
    message: '',
  };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.seo.updateMeta({
      title: 'Invite Satendra – Fill Out the Contact Form',
      description:
        'Invite Satendra to collaborate, share ideas, or connect! Fill out the contact form and get a quick response from Satendra Rajput.',
      keywords:
        'Invite Satendra, connect with Satendra, Satendra Rajput contact, invite form, collaboration with Satendra',
      url: 'https://satendracoder.com/invite-satendra',
      image: 'https://satendracoder.com/assets/cover-image.png',
    });
  }

  submitMemberForm(form: NgForm) {
    if (form.valid) {
      debugger;
      //console.log('Contact Submitted:', this.memberData);
      this.sAskapi.sendMessage(this.memberData).subscribe({
        next: (res) => {
          // console.log(res);
          this.toaster.show(res?.message, 'success');
          form.resetForm();
        },
        error: () => {
          alert('Failed to send message.');
        },
      });
    }
  }

  closeAndRedirect() {
    this.route.navigate(['/']);
  }
}
