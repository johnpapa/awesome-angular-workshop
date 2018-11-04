// tslint:disable:member-ordering
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

///// Producer Class //////
class Producer {
  constructor(private observer: Observer<string>) {}

  // Various "next" behaviors
  hit() {
    this.observer.next('Hit!');
    console.log(`next: 'Hit!'`);
  }

  stay() {
    this.observer.next('Stay');
    console.log(`next: 'Stay'`);
  }

  // Error behavior
  panic() {
    this.observer.error('Something bad happened');
    console.log(`error: 'Something bad happened'`);
  }

  // Complete behavior
  done() {
    console.log(`complete()`);
    this.observer.next('Done listening');
    this.observer.complete();
  }
}

//////  Component //////////

@Component({
  selector: 'aw-basic-02',
  template: `
    <h4>02 - Error & Complete</h4>

    <div style="margin-bottom: 1rem;">
      <button type="button" (click)="producer.hit()"  >Hit me</button>
      <button type="button" (click)="producer.stay()" >Stay</button>
      <button type="button" (click)="producer.panic()">Panic</button>
      <button type="button" (click)="producer.done()" >Done</button>
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
export class Basic02Component implements OnInit {
  errorMessage = '';
  messages: string[] = [];

  producer: Producer;

  // Wrap new Producer in an RxJS Observable
  observable = new Observable((o: Observer<string>) => {
    this.producer = new Producer(o);
  });

  // Subscriber: An object with all three Observable methods
  subscriber = {
    next: (value: string) => this.messages.push(value),

    error: (err: string) => (this.errorMessage = err),

    complete: () => this.messages.push('Observable completed')
  };

  ngOnInit() {
    // Subscribe to execute (nothing happens until we subscribe!)
    // The subscriber will receive emitted values from the observable.
    this.observable.subscribe(this.subscriber);
  }

  clear() {
    this.errorMessage = '';
    this.messages = [];
  }
}
