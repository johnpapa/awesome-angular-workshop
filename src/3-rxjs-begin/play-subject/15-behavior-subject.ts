import { BehaviorSubject } from 'rxjs';

/**
 * BehaviorSubject created with an initial value
 * and emits its latest value
 */
export function play(...args: any[]) {

  const behaviorSubject = new BehaviorSubject('Waiting for data');

  setTimeout(() => {
    behaviorSubject.next('Got the data');

    // behaviorSubject.error('Oops ... error');

    // behaviorSubject.complete();

    behaviorSubject.next('Got data again');
  }, 500);

  return behaviorSubject;
}
