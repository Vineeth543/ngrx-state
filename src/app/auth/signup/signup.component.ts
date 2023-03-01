import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { signupStart } from '../state/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  showEmailErrors(): string | void {
    const emailForm = this.signupForm.get('email');
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
    const passwordForm = this.signupForm.get('password');
    if (passwordForm?.touched && !passwordForm.valid) {
      if (passwordForm.errors?.['required']) {
        return 'Password is required';
      }
      if (passwordForm.errors?.['minlength']) {
        return 'Password must atleast have 6 characters';
      }
    }
  }

  onSignup(): void {
    if (!this.signupForm.valid) return;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }
}
