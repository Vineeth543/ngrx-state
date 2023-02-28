import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterCustomInputComponent } from './counter-custom-input/counter-custom-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';

const routes: Routes = [{ path: '', component: CounterComponent }];

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CounterCustomInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('counter', counterReducer),
    RouterModule.forChild(routes),
  ],
})
export class CounterModule {}
