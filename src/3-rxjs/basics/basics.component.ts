import { Component } from '@angular/core';

@Component({
  selector: 'app-basics',
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
    <app-basic-01 *ngSwitchCase="01"></app-basic-01>
    <app-basic-02 *ngSwitchCase="02"></app-basic-02>
    <app-basic-03 *ngSwitchCase="03"></app-basic-03>
    <app-basic-04 *ngSwitchCase="04"></app-basic-04>
    <app-basic-05 *ngSwitchCase="05"></app-basic-05>
    <app-basic-06 *ngSwitchCase="06"></app-basic-06>
    <app-basic-07 *ngSwitchCase="07"></app-basic-07>
  </div>
`
})
export class BasicsComponent {
  demo = '';
}
