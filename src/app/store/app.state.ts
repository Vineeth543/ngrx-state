import { SharedState } from './shared/shared.state';
import { AuthState } from '../auth/state/auth.state';
import { SharedReducer } from './shared/shared.reducer';
import { AuthReducer } from '../auth/state/auth.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
}

export const AppReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};
