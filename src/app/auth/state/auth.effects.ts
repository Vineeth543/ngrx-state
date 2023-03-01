import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { loginStart, loginSuccess } from './auth.action';
import { AuthService } from 'src/app/services/auth.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: { email: string; password: string }) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });
}
