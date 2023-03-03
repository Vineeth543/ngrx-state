import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { loginStart } from '../state/auth.action';
import { AppState } from 'src/app/store/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  showFormErrors(field: string): string | void {
    const targetField = this.loginForm.get(field);
    if (targetField?.touched && !targetField.valid) {
      if (targetField.errors?.['required']) {
        return field[0].toUpperCase() + field.slice(1) + ' is required';
      }
      if (targetField.errors?.['email'] && field === 'email') {
        return 'Email must be valid';
      }
      if (targetField.errors?.['minlength'] && field === 'password') {
        return 'Password must atleast have 6 characters';
      }
    }
  }

  onLogin(): void {
    if (!this.loginForm.valid) return;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}
