import { Store } from '@ngrx/store';
import { Component, EventEmitter, Output } from '@angular/core';
import { decrement, increment, reset } from '../state/counter.actions';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.less'],
})
export class CounterButtonsComponent {
  // @Output() increment = new EventEmitter<void>();
  // @Output() decrement = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();

  constructor(private store: Store<{ counter: { counter: number } }>) {}

  onIncrement(): void {
    // this.increment.emit();
    this.store.dispatch(increment());
  }

  onDecrement(): void {
    // this.decrement.emit();
    this.store.dispatch(decrement());
  }

  onReset(): void {
    // this.reset.emit();
    this.store.dispatch(reset());
  }
}
