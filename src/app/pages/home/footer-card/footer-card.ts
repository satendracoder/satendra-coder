import { Component, effect, Signal } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer-card',
  standalone: true,
  imports: [MateriallistModule],
  templateUrl: './footer-card.html',
  styleUrl: './footer-card.scss',
})
export class FooterCard {
  currentYear: number = new Date().getFullYear();

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Mark all fields as touched to show errors
      form.controls['email']?.markAsTouched();
      return;
    }

    console.log('Submitted Email:', form.value.email);
  }
}
