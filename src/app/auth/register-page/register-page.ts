import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriallistModule } from '../../shared/materiallist/materiallist-module';
import { SAuth } from '../service/s-auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginPage } from '../login-page/login-page';
import { ToastService } from 'sc-angular-toastify';

@Component({
  selector: 'app-register-page',
  imports: [MateriallistModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  showPassword: boolean = false;
  registerForm!: FormGroup;
  readonly dialog = inject(MatDialog);

  constructor(
    private authService: SAuth,
    private toaster: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Method to handle form submission
  onSubmit() {
    if (this.registerForm.valid) {
      debugger;
      this.authService
        .register(this.registerForm.value)
        .subscribe((response) => {
          try {
            //console.log('Parsed Response:', response);
            this.toaster.show(response?.message, 'success');
            this.registerForm.reset();
           this.router.navigate(['/auth/login']);
          } catch (error) {
            //console.log('Response is not JSON:', response);
          }
        });
    } else {
      //console.log('Form is invalid');
    }
  }

  // Helper method to check if a field is valid and touched
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  // Google login
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  // Github login
  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
  }

  loginCard() {
    this.dialog.closeAll();
    setTimeout(() => {
      const dialogRef = this.dialog.open(LoginPage, {
        panelClass: 'custom-dialog',
      });
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
