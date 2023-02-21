import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.less'],
})
export class CounterButtonsComponent {
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  onIncrement(): void {
    this.increment.emit();
  }

  onDecrement(): void {
    this.decrement.emit();
  }

  onReset(): void {
    this.reset.emit();
  }
}
