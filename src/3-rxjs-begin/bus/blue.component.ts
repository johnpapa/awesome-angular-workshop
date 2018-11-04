import { Component } from '@angular/core';
import { ColorComponent } from './color.component';
import { BusService } from './bus.service';

@Component({
  selector: 'aw-blue',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class BlueComponent extends ColorComponent {
  color = 'Blue';
  constructor(bus: BusService) {
    super(bus);
  }
}
