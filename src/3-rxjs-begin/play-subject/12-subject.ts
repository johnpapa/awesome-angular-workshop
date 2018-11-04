import { Subject } from 'rxjs';

import { timerData$ } from '../core/helpers';

export function play(...args: any[]) {

  /**
   * Subject keep a list of subscribers and notify all of them (multi-cast)
   * each time they emit on a channel.
   */
  const subject = new Subject();

  timerData$.subscribe(n => {
    subject.next(n);
  });

  return subject;

  // WHY IS THE FOLLOWING A BETTER PRACTICE?
  // return subject.asObservable();
}
