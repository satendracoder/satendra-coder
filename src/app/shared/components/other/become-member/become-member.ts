import { Component, inject } from '@angular/core';
import { MateriallistModule } from '../../../materiallist/materiallist-module';
import { Router } from '@angular/router';
import { SAskme } from '../../../../core/service/global/askme/s-askme';
import { ToastService } from 'sc-angular-toastify';

@Component({
  selector: 'app-become-member',
  imports: [MateriallistModule],
  templateUrl: './become-member.html',
  styleUrl: './become-member.scss',
})
export class BecomeMember {
  private route = inject(Router);
  private becomeapi = inject(SAskme);
  private toaster = inject(ToastService);

  onSubmit(form: any) {
    if (form.valid) {
      //console.log('Form Data:', form.value);
      this.becomeapi.becomeMember(form.value).subscribe({
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
