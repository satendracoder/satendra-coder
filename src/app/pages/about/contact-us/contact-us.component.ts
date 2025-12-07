import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SSeo } from '../../../core/service/other/seo/s-seo';
import { Router } from '@angular/router';
import { ToastService } from 'sc-angular-toastify';
import { SAskme } from '../../../core/service/global/askme/s-askme';
import { MaskPhonePipe } from '../../../shared/pipes/maskphone/mask-phone.pipe';
import { MaskEmailPipe } from '../../../shared/pipes/maskemail/mask-email.pipe';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule, MaskPhonePipe, MaskEmailPipe],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
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

  submitMemberForm(form: NgForm) {
    if (form.valid) {
      debugger;
      console.log('Contact Submitted:', this.memberData);
      this.sAskapi.sendMessage(this.memberData).subscribe({
        next: (res) => {
          //console.log(res);
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
