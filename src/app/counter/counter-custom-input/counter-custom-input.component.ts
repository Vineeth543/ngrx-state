import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { customCounter } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-custom-input',
  templateUrl: './counter-custom-input.component.html',
  styleUrls: ['./counter-custom-input.component.less'],
})
export class CounterCustomInputComponent {
  value: number = 0;

  constructor(private store: Store<{ counter: CounterState }>) {}

  add(): void {
    this.store.dispatch(customCounter({ counter: this.value }));
  }
}
