import { ReplaySubject } from 'rxjs';

/**
 * ReplaySubject has no initial value.
 * It emits when asked
 * It "replays" the last (n) nexted values for new subscribers
 */
export function play(...args: any[]) {

  const replaySubject = new ReplaySubject(2); // play with buffer size

  setTimeout(() => {
    replaySubject.next('Got the data');

    // Try these variations. What happens?
    // replaySubject.error('Oops ... error');
    // replaySubject.complete();

    replaySubject.next('Got data again');
  }, 500);

  return replaySubject;
}



/**
 * BehaviorSubject could be implemented with ReplaySubject
 * // subject = new Rxjs.ReplaySubject(1); // buffer one value
 * // subject.next('initial'); // immediately next the initial value, before 1st possible subscription.
 */
