import { CounterState, initialState } from './counter.state';
import { Action, createReducer, on } from '@ngrx/store';
import {
  changeName,
  customCounter,
  decrement,
  increment,
  reset,
} from './counter.actions';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customCounter, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.counter,
    };
  }),
  on(changeName, (state) => {
    return {
      ...state,
      name: 'Vineeth The Great',
    };
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
