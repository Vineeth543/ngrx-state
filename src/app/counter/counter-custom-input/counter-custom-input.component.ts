import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { changeName, customCounter } from '../state/counter.actions';
import { getName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-custom-input',
  templateUrl: './counter-custom-input.component.html',
  styleUrls: ['./counter-custom-input.component.less'],
})
export class CounterCustomInputComponent implements OnInit {
  value: number = 0;
  name$: Observable<string> = new Observable<string>();

  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit(): void {
    this.name$ = this.store.select(getName).pipe(
      tap(() => {
        console.log('Change Name Observable Fired.');
      })
    );
  }

  add(): void {
    this.store.dispatch(customCounter({ counter: this.value }));
  }

  changeName(): void {
    this.store.dispatch(changeName());
  }
}
