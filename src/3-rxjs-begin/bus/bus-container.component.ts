import { Component } from '@angular/core';
import { BusService, Message } from './bus.service';

@Component({
  selector: 'aw-bus',
  template: `
  <h3>Message Bus <button (click)="clear()">Clear All</button></h3>
    <aw-red></aw-red>
    <aw-green></aw-green>
    <aw-blue></aw-blue>
  `
})
export class BusContainerComponent {
  constructor(private bus: BusService) {  }

  clear() {
    this.bus.send({ type: 'clear' });
  }
}
