import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.less'],
})
export class CounterOutputComponent implements OnInit {
  counter$: Observable<number> = new Observable<number>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter).pipe(
      tap(() => {
        console.log('Counter Increment Observable Fired.');
      })
    );
  }
}
