import { exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { loginStart, loginSuccess } from './auth.action';
import { AuthService } from 'src/app/services/auth.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: { email: string; password: string }) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });
}
