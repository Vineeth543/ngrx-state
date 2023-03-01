import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
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
        return 'Password must atleast have 6 characters';
      }
    }
  }

  onLogin(): void {
    if (!this.loginForm.valid) return;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.store.dispatch(loginStart({ email, password }));
  }
}
