import { Component } from '@angular/core';
import { ColorComponent } from './color.component';
import { BusService } from './bus.service';

@Component({
  selector: 'aw-green',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class GreenComponent extends ColorComponent {
  color = 'Green';
  constructor(bus: BusService) {
    super(bus);
  }
}
