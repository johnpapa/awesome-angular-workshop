// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'aw-basic-04',
  template: `
    <h4>04 - Producer on its own</h4>

    <div style="margin-bottom: 1rem;">
      <button type="text" (click)="start()">Start</button>
      <button type="text" (click)="clear()">Clear</button>
    </div>

    <div *ngFor="let message of messages">
      {{message}}
    </div>

    <div *ngIf="errorMessage" style="background-color: red; color: white">
      OMG! We got an error!
      {{errorMessage}}!
      Time to panic!
    </div>
  `
})
export class Basic04Component {

  errorMessage = '';
  messages: string[] = [];

  observable = new Observable(observer => {
    // Inline producer starts emitting when subscribed

    // Synchronous emits
    observer.next('wait');
    observer.next('for');
    observer.next('it');
    observer.next('...');

    // Async - wait 2 seconds
    setTimeout(() => {
      observer.next('TA DA!'); // delayed emit
      observer.complete();
    }, 2000);

    // observer.error('oh no!');
  });

  start() {

    this.observable.subscribe(
      (value: string) => this.messages.push(value),
      (err: string) => (this.errorMessage = err),
      () => this.messages.push('Observable completed')
    );

  }

  clear() {
    this.errorMessage = '';
    this.messages = [];
  }

}
