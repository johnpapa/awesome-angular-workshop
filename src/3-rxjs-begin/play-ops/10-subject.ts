// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

/**
 * Subject as a producer of values
 * Usage:
 *
 *   play(this).subscribe(subscriber);
 */
export function play(component: { producer: Rxjs.Observer<string> }) {

  // Subject as a producer of Observable values
  const subject = new Rxjs.Subject<string>();

  component.producer = {
    next(value) { subject.next('Subject next: ' + value) },
    error(err) { subject.error('Subject error: ' + err) },
    complete() {
      subject.next('Subject completing');
      subject.complete();
    }
  }

  return subject.asObservable();
}
