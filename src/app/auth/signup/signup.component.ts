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
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  showFormErrors(field: string): string | void {
    const targetField = this.signupForm.get(field);
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

  onSignup(): void {
    if (!this.signupForm.valid) return;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }
}
