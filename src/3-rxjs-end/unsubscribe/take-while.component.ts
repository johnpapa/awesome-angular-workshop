import { TimeService } from './time.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'aw-take-while',
  template: `<p>TakeWhile {{time }}`
})
export class TakeWhileComponent implements OnInit, OnDestroy {
  time: string;
  active = true;

  constructor(private t: TimeService) {}

  ngOnInit() {
    this.t
      .time$('TakeWhile')
      .pipe(takeWhile(() => this.active))
      .subscribe(
        time => (this.time = time),
        err => console.error(err),
        () => console.log('completed')
      );
  }

  ngOnDestroy() {
    this.active = false;
  }
}
