import { Component, OnDestroy } from '@angular/core';
import { TimeService } from './time.service';
import { Observable } from 'rxjs';

let counter = 0;

@Component({
  selector: 'aw-async',
  template: `<p>AsyncPipe time: {{ time$ | async }}</p>`
})
export class AsyncPipeComponent implements OnDestroy {
  time$: Observable<string>;

  constructor(public timeService: TimeService) {
    counter += 1;
    this.time$ = this.timeService.time$(`AsyncPipeComponent #${counter}`);
  }
  ngOnDestroy() {
    console.log(`AsyncPipeComponent #${counter} destroyed`);
  }
}
