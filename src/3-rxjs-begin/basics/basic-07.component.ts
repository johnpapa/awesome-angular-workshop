// tslint:disable:member-ordering
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent } from 'rxjs';

// RxJS Operators
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'aw-basic-07',
  template: `
    <h4>07 - pipe</h4>

    <div style="margin-bottom: 1rem;">
      <button type="text" (click)="clear()">Clear</button>
    </div>

    <input #input/>

    <ol>
      <li *ngFor="let message of messages">{{message}}</li>
    </ol>
  `
})
export class Basic07Component implements OnInit {
  @ViewChild('input')
  inputElRef: ElementRef;
  inputEl: HTMLInputElement;
  messages: string[] = [];

  ngOnInit() {
    this.inputEl = this.inputElRef.nativeElement;

    const enterKeyObservable = fromEvent<KeyboardEvent>(this.inputEl, 'keyup')
      // "pipe" operators to manipulate observable outputs
      .pipe(
        // Tap for side-effects
        // Report each key to console (typical debugging step)
        tap(keyboardEvent => {
          console.log('KeyboardEvent', keyboardEvent);
        }),

        // Filter: let value through when predicate is true
        // Only let the enter key through
        filter(KeyboardEvent => KeyboardEvent.key === 'Enter')
      );

    enterKeyObservable.subscribe(enterKeyEvent => {
      this.messages.push(this.inputEl.value);
    });
  }

  clear() {
    this.messages = [];
    this.inputEl.value = '';
  }
}
