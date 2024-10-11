import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login.Service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.email]],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Password match validator
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onRegisterSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      const name = data.firstName + ' ' + data.lastName;
      const email = data.email;
      const password = data.password;
      this.loginService.register(name, email, password).subscribe((response) => {
        console.log('Registration successful');
        this.submitted = false;
        this.registerForm.reset();
      })
    }
  }
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch')) {
      this.registerForm.controls['confirmPassword'].setErrors([
        { passwordMismatch: true },
      ]);
    } else {
      this.registerForm.controls['confirmPassword'].setErrors(null);
    }
  }
}
