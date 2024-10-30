import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login.Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;
  loginErrorMessage: string = '';
  loading: boolean = false; // New loading property

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; // Start loading
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => {
          this.loading = false; // Stop loading on success
          this.loginError = false;
        },
        error: (error) => {
          this.loading = false; // Stop loading on error
          this.loginError = true;
          this.loginErrorMessage = error.error?.message || 'Login failed. Please try again.';
        },
      });
    } else {
      this.loginErrorMessage = 'Please enter a valid email and password.';
      this.loginError = true;
    }
  }
}
