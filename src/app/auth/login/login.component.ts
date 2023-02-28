import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  showEmailErrors(): string | void {
    const emailForm = this.loginForm.get('email');
    if (emailForm?.touched && !emailForm.valid) {
      if (emailForm.errors?.['required']) {
        return 'Email is required';
      }
      if (emailForm.errors?.['email']) {
        return 'Email should be valid';
      }
    }
  }

  showPasswordErrors(): string | void {
    const passwordForm = this.loginForm.get('password');
    if (passwordForm?.touched && !passwordForm.valid) {
      if (passwordForm.errors?.['required']) {
        return 'Password is required';
      }
      if (passwordForm.errors?.['minlength']) {
        return 'Password must atleast have 8 characters';
      }
    }
  }

  onLogin(): void {
    if (!this.loginForm.valid) return;
    console.log(this.loginForm.value);
  }
}
