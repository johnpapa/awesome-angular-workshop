import { Component } from '@angular/core';
import { ColorComponent } from './color.component';
import { BusService } from './bus.service';

@Component({
  selector: 'aw-red',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class RedComponent extends ColorComponent {
  color = 'Red';
  constructor(bus: BusService) {
    super(bus);
  }
}
