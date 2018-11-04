// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

/**
 * BehaviorSubject created with an initial value
 * and emits its latest value
 */
export function play(...args: any[]) {

  const behaviorSubject = new Rxjs.BehaviorSubject('Waiting for data');

  setTimeout(() => {
    behaviorSubject.next('Got the data');

    // behaviorSubject.error('Oops ... error');

    // behaviorSubject.complete();

    behaviorSubject.next('Got data again');
  }, 500);

  return behaviorSubject;
}
