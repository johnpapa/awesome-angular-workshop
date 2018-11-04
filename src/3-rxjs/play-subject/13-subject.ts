// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

export function play(...args: any[]) {

  const subject = new Rxjs.Subject();

  subject.next('Waiting for data');

  setTimeout(() => {
    subject.next('Got the data');

    // Try these variations.
    // subject.error('BANG!');
    // subject.complete();

  }, 500);

  return subject;
}
