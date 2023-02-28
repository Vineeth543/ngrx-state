import { createAction, props } from '@ngrx/store';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');

export const customCounter = createAction(
  'Custom Counter',
  props<{ counter: number }>()
);

export const changeName = createAction('changeName');
