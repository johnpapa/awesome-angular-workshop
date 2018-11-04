import { Component } from '@angular/core';

@Component({
  selector: 'aw-basics',
  template: `
  <h3>Basics</h3>

  <div>
    <button (click)="demo='01'">1</button>
    <button (click)="demo='02'">2</button>
    <button (click)="demo='03'">3</button>
    <button (click)="demo='04'">4</button>
    <button (click)="demo='05'">5</button>
    <button (click)="demo='06'">6</button>
    <button (click)="demo='07'">7</button>
  </div>

  <div [ngSwitch]="demo">
    <aw-basic-01 *ngSwitchCase="01"></aw-basic-01>
    <aw-basic-02 *ngSwitchCase="02"></aw-basic-02>
    <aw-basic-03 *ngSwitchCase="03"></aw-basic-03>
    <aw-basic-04 *ngSwitchCase="04"></aw-basic-04>
    <aw-basic-05 *ngSwitchCase="05"></aw-basic-05>
    <aw-basic-06 *ngSwitchCase="06"></aw-basic-06>
    <aw-basic-07 *ngSwitchCase="07"></aw-basic-07>
  </div>
`
})
export class BasicsComponent {
  demo = '';
}
