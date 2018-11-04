// #region imports
// tslint:disable:member-ordering
import { of, Observable } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';

// Namespace to get something you need
import { tap } from 'rxjs/operators';
// #endregion imports
import { timerData$ } from '../core/helpers';

/**
 * Observer logs to the console with optional name prefix
 * When observable nexts, errors, or completes
 */
export const loggingObserver = (name?: string) => ({
  next(value: any) { name ? console.log(name, value) : console.log(value); },
  error(err: any) { console.error((name ?  `${name}: ` : '') + err); },
  complete() { console.log((name ?  `${name}: ` : '') + 'Completed'); }
});



/** Custom operator that taps into observable and logs it with the loggingObserver */
export const logOp = (name?: string) =>
  (o: Observable<any>) => o.pipe(
    // tap operator for side-effects like logging
    tap(loggingObserver(name))
  );


export function play(...args: any[]) {

  const observable$ = timerData$.pipe(
    logOp('Custom logger')
  );

  return observable$;

}





/// SIMPLE VERSION. NO NAME

/** Observer logs to the console when observable nexts, errors, or completes */
export const logObserver = () => ({
  next(value: any) { console.log(value); },
  error(err: any) { console.error(err); },
  complete() { console.log('Completed'); }
});

/** Operator fn: takes an observable; returns an observable */
export const log = (o: Observable<any>) => o.pipe(
  tap(logObserver())
);

const numbers$ = of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
const result$ = numbers$.pipe(
  filter(i => i % 2 === 1),
  log,
  map(i => i * 2),
  reduce((acc, curr) => acc + curr, 0)
);
