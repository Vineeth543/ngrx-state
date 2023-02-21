import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.less'],
})
export class CounterOutputComponent {
  @Input() counter: number = 0;
}
