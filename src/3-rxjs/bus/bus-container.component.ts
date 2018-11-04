import { Component } from '@angular/core';
import { BusService, Message } from './bus.service';

@Component({
  selector: 'aw-bus',
  template: `
  <h3>Message Bus <button (click)="clear()">Clear All</button></h3>
    <app-red></app-red>
    <app-green></app-green>
    <app-blue></app-blue>
  `
})
export class BusContainerComponent {
  constructor(private bus: BusService) {  }

  clear() {
    this.bus.send({ type: 'clear' });
  }
}
