import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selector';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}

export const AppReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
};
