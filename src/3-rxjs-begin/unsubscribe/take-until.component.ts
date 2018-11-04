// tslint:disable:member-ordering
import { TimeService } from './time.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let counter = 0;

@Component({
  selector: 'aw-take-until',
  template: `<p>TakeUntil time: {{ time }}</p>`
})
export class TakeUntilComponent implements OnInit, OnDestroy {
  time: string;
  time$: Observable<string>;

  // #1 - create a component-destroy Notifier subject
  private destroy$ = new Subject<void>();

  ngOnInit() {
    counter += 1;
    this.time$ = this.timeService.time$(`TakeUntilComponent #${counter}`);
    this.time$
      .pipe(
        // #2 Pipe the destroy-notifier into `takeUntil()`
        takeUntil(this.destroy$)
      )
      .subscribe(
        time => (this.time = time),
        err => console.error(err),
        () => console.log('TakeUntilComponent completed')
      );
  }

  // #3 Call next() on the destroy-notifier when component dies
  ngOnDestroy() {
    this.destroy$.next();
    console.log(`TakeUntilComponent #${counter} destroyed`);
  }

  constructor(private timeService: TimeService) {}
}

/**
 * That's a lot of noise!
 * Consider "AutoUnsubscribe"
 * https://github.com/NetanelBasal/ngx-auto-unsubscribe/blob/master/src/auto-unsubscribe.ts
 */
