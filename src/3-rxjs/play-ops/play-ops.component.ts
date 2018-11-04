// #region imports
// tslint:disable:member-ordering
import { Component, OnDestroy } from '@angular/core';
import { messageObserver } from '../core/helpers';

// Always available in the ops playground
import { Observable, Subscription } from 'rxjs';

// Namespace to get something you need
import * as Rxjs from 'rxjs';
// #endregion imports

import { play as map01 } from './01-map';
import { play as mapToSomething01a } from './01a-map-to-something';
import { play as throw02 } from './02-throw';
import { play as throwError03 } from './03-throwError';
import { play as arrayMagic04 } from './04-array-magic';
import { play as pipeMagic05 } from './05-pipe-magic';
import { play as scanMagic06 } from './06-scan-magic';
import { play as loggerOp07 } from './07-loggerOp';
import { play as oddDoublerOp08 } from './08-oddDoublerOp';
import { play as subject10 } from './10-subject';

import { play as groupBy99 } from './99-groupBy';
import { play as unsubscriber99 } from './99-unsubscriber';
import { play as finalize99 } from './99-finalize';

const playFns: {[name: string]: (...args: any[]) => Observable<any>} = {
  '01-map': map01,
  '01a-map-to-something': mapToSomething01a,
  '02-throw': throw02,
  '03-throwError': throwError03,
  '04-array-magic': arrayMagic04,
  '05-pipe-magic': pipeMagic05,
  '06-scan-magic': scanMagic06,
  '07-loggerOp': loggerOp07,
  '08-oddDoublerOp': oddDoublerOp08,
  '10-subject': subject10,
  '99-groupBy': groupBy99,
  '99-unsubscriber': unsubscriber99,
  '99-finalize': finalize99,
};


@Component({
  selector: 'aw-play-ops',
  templateUrl: './play-ops.component.html',
  styleUrls: [ './play-ops.component.scss'],
})
export class PlayOpsComponent implements OnDestroy {

  playList = Object.keys(playFns);
  playName = this.playList[0];
  subscription: Subscription;

  selected(value: any) {
    this.playName = value;
    this.producer = undefined;
    this.errorMessage = '';
    this.messages = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  start() {

    const subscriber = messageObserver(this);

    this.messages.push('-- Before subscribe --');

    const observable$ = playFns[this.playName](this);
    this.subscription = observable$.subscribe(subscriber);

    this.messages.push('-- After subscribe --');

  }

  // #region helpers
  complete = () => this.producer && this.producer.complete();
  error = () => this.producer && this.producer.error('Error');
  errorMessage = '';
  messages: any[] = [];
  next = () => this.producer && this.producer.next('Next!');
  producer: Rxjs.Observer<any> = null;
  unsubscribe = () => this.producer && this.subscription.unsubscribe();

  clear() {
    this.errorMessage = '';
    this.messages = [];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // #endregion helpers
}
