import { Component } from '@angular/core';

@Component({
  selector: 'aw-unsubscribe',
  template: `
    <h3>Unsubscribe Alternatives</h3>
    <p>Click the buttons to change example.</p>
    <p>Open console to see output.</p>

    <button (click)="toggle('leaky')" type="text">Memory Leak</button>
    <button (click)="toggle('asyncPipe')" type="text">AsyncPipe</button>
    <button (click)="toggle('takeUntil')" type="text">takeUntil</button>
    <button (click)="toggle('takeWhile')" type="text">takeWhile</button>
    <button (click)="toggle('subSink')" type="text">SubSink</button>
    <button (click)="ex='close'" type="text">Close</button>

    <div [ngSwitch]="ex">
      <aw-leaky *ngSwitchCase="'leaky'"></aw-leaky>
      <aw-sub-sink *ngSwitchCase="'subSink'"></aw-sub-sink>
      <aw-async *ngSwitchCase="'asyncPipe'"></aw-async>
      <aw-take-until *ngSwitchCase="'takeUntil'"></aw-take-until>
      <aw-take-while *ngSwitchCase="'takeWhile'"></aw-take-while>
    </div>
  `,
})
export class UnsubscribeComponent {
  ex: string;

  toggle(name: string) {
    this.ex = this.ex === name ? '' : name;
  }
}
