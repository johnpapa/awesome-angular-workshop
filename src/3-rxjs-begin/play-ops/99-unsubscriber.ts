// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

// #region Producer Class
export class Producer {
  constructor(private observer: Rxjs.Observer<string>) { }

  next(value?: string) {
    console.log(`next: ${value || 'Hit me!'}`);
    this.observer.next(value || 'Hit me!');
   }

   error(err?: string) {
     console.log(`error: ${err}`);
     this.observer.error(err);
   }

   // Complete behavior
   complete() {
     console.log(`complete()`);
     this.observer.complete();
   }
}
// #endregion Producer Class

/**
 * Usage:
 *  const observable$ = play(this); // the PlayComponent instance
 */
export function play(component: { producer: Rxjs.Observer<string> }) {


  const observable$ = new Rxjs.Observable((subscriber: Rxjs.Subscriber<string>) => {

    component.producer = new Producer(subscriber);

    // return a "Teardownable" object (has an "unsubcribe()")
    return {
      unsubscribe() {
        subscriber.unsubscribe();
        console.log('Producer unsubscribed!');
        alert('Producer unsubscribed!');
      }
    }
  });

  return observable$

}
