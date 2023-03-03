import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less'],
})
export class CounterComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }
}
