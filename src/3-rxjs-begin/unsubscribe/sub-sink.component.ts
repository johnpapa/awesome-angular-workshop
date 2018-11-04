// tslint:disable:member-ordering
import { TimeService } from './time.service';
import { Component, OnDestroy, OnInit } from '@angular/core';


import { SubSink } from 'subsink';

let counter = 0;

@Component({
  selector: 'aw-sub-sink',
  template: ` <p>SubSink time: {{ time }}</p>`
})
export class SubSinkComponent implements OnInit, OnDestroy {
  prefix = '';
  time: string;

  // #1 declare a sink for subscriptions
  private subs = new SubSink();

  ngOnInit() {
    counter += 1;
    const time$ = (name: string) => this.timeService.time$(`SubSink #${counter} ${name}`);

    // Create a subscriber for demo purposes ... because we'll subscribe the same way multiple times
    const subscriber = (() => {
      const that = this;
      return {
        next(time: string) {
          that.time = `${time}`;
        },
        error(err: any) {
          console.error(err);
        },
        complete() {
          console.log('SubSinkComponent completed');
        } // never called!
      };
    })();

    // #2 Assign subscriptions to the sink or call add()
    this.subs.sink = time$('A').subscribe(subscriber);
    this.subs.sink = time$('B').subscribe(subscriber);
    this.subs.sink = time$('C').subscribe(subscriber);

    // this works too
    this.subs.add(
      time$('D').subscribe(subscriber),
      time$('E').subscribe(subscriber)
    );
  }

  // #3 Call unsubscribe on the sink.
  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log(`SubSinkComponent #${counter} destroyed`);
  }

  constructor(private timeService: TimeService) {}
}
