import { Injectable } from '@angular/core';

import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

export class Message {
  type: string;
  payload?: any;
  sender?: any;
}

@Injectable({providedIn: 'root'})
export class BusService {

  private subject = new Subject<Message>();
  messages$ = this.subject.asObservable();

  send(message: Message) {
    this.subject.next(message);
  }
}

