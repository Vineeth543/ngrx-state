import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Component, OnInit } from '@angular/core';
import { setErrorMessage } from '../store/shared/shared.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }
}
