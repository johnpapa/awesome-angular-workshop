import { Component } from '@angular/core';

import { asapScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

import { BusyService } from './core';

@Component({
  selector: 'aw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  busy = false;

  constructor(busyService: BusyService) {
    busyService.busy$.pipe(
      observeOn(asapScheduler) // Ensure is async; remove and look in console
    ).subscribe(is => this.busy = is);
  }
}
