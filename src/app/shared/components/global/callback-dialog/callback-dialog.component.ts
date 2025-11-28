import { Component } from '@angular/core';
import { MateriallistModule } from '../../../materiallist/materiallist-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-callback-dialog',
  imports: [MateriallistModule],
  templateUrl: './callback-dialog.component.html',
  styleUrl: './callback-dialog.component.scss',
})
export class CallbackDialogComponent {
  callbackForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.callbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      date: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.callbackForm.invalid) {
      this.callbackForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted:', this.callbackForm.value);
  }
}
