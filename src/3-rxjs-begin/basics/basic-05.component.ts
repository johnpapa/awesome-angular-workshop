// tslint:disable:member-ordering
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'aw-basic-05',
  template: `
    <h4>05 - Observe keystrokes</h4>

    <div style="margin-bottom: 1rem;">
      <button type="text" (click)="clear()">Clear</button>
    </div>

    <input #input/>

    <ol>
      <li *ngFor="let message of messages">{{message}}</li>
    </ol>
  `
})
export class Basic05Component implements OnInit {
  @ViewChild('input')
  inputElRef: ElementRef;
  inputEl: HTMLInputElement;
  messages: string[] = [];

  ngOnInit() {
    this.inputEl = this.inputElRef.nativeElement;

    // Custom observable listens for input keystrokes
    const keyupObservable = new Observable((o: Observer<KeyboardEvent>) => {
      const listener = (evt: KeyboardEvent) => o.next(evt);
      this.inputEl.addEventListener('keyup', listener);
    });

    keyupObservable.subscribe(keyupEvent => {
      console.log('KeyUp event', keyupEvent);
      this.messages.push(this.inputEl.value);
    });
  }

  clear() {
    this.messages = [];
    this.inputEl.value = '';
  }
}
