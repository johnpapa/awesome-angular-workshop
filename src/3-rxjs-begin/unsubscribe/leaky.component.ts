import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeService } from './time.service';
import { Observable } from 'rxjs';

let counter = 0;

@Component({
  selector: 'aw-leaky',
  template: `
    <p><i>The timer keeps ticking even though component is gone.</i></p>
    <p>Leaky time: {{ time }}</p>
    `
})
export class LeakyComponent implements OnInit, OnDestroy {
  time: string;
  time$: Observable<string>;

  ngOnInit() {
    counter += 1;
    this.time$ = this.timeService.time$(`Leaky #${counter}`);
    this.time$.subscribe(
      time => (this.time = time),
      err => console.error(err),
      () => console.log('TakeUntil completed')
    );
  }

  ngOnDestroy() {
    console.log(`Leaky #${counter} destroyed`);
  }

  constructor(private timeService: TimeService) {}
}
