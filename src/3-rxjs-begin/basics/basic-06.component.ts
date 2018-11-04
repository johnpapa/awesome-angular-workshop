// tslint:disable:member-ordering
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent } from 'rxjs';

@Component({
  selector: 'aw-basic-06',
  template: `
    <h4>06 - fromEvent</h4>

    <div style="margin-bottom: 1rem;">
      <button type="text" (click)="clear()">Clear</button>
    </div>

    <input #input/>

    <ol>
      <li *ngFor="let message of messages">{{message}}</li>
    </ol>
  `
})
export class Basic06Component implements OnInit {
  @ViewChild('input')
  inputElRef: ElementRef;
  inputEl: HTMLInputElement;
  messages: string[] = [];

  ngOnInit() {
    this.inputEl = this.inputElRef.nativeElement;

    // RxJS `fromEvent` makes it easy to observe DOM events (note import above)
    const keyupObservable = fromEvent<KeyboardEvent>(this.inputEl, 'keyup');

    keyupObservable.subscribe(keyboardEvent => {
      console.log('KeyboardEvent', keyboardEvent);
      this.messages.push(this.inputEl.value);
    });
  }

  clear() {
    this.messages = [];
    this.inputEl.value = '';
  }
}
