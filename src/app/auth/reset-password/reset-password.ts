import { Component } from '@angular/core';
import { MateriallistModule } from '../../shared/materiallist/materiallist-module';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SAuth } from '../service/s-auth';
import { ToastService } from 'sc-angular-toastify';

interface ResetPasswordForm {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-reset-password',
  imports: [MateriallistModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  resetForm: FormGroup;
  token!: string;

  constructor(
    private apiAuth: SAuth,
    private toaster: ToastService,
    private routeer: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // ✅ avoid fb.nonNullable, use classic approach
    this.resetForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      //console.log('Token from query param:', this.token);
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const group = control as FormGroup;
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid) {
      //console.log('Form Submitted!', this.resetForm.value);
      this.apiAuth
        .resetPassword(this.token, this.resetForm.controls['password'].value)
        .subscribe({
          next: (response) => {
            this.toaster.show(
              response?.message ||
                'Password reset successfully. You can now log in with your new password.',
              'success'
            );
            this.routeer.navigate(['/auth/login']);
            this.resetForm.reset();
          },
          error: (error) => {
            console.error('Error resetting password:', error);
            this.toaster.show(
              error?.error?.message ||
                'Error resetting password. Please try again.',
              'error'
            );
          },
        });
    }
  }
}
