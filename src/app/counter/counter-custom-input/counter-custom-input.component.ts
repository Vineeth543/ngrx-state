import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { getName } from '../state/counter.selectors';
import { changeName, customCounter } from '../state/counter.actions';

@Component({
  selector: 'app-counter-custom-input',
  templateUrl: './counter-custom-input.component.html',
  styleUrls: ['./counter-custom-input.component.less'],
})
export class CounterCustomInputComponent implements OnInit {
  value: number = 0;
  name$: Observable<string> = new Observable<string>();

  constructor(private store: Store<AppState>) {}

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
