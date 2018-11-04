import { Observable, of, interval } from 'rxjs';

import { filter, map, reduce, scan, take } from 'rxjs/operators';

// #region Custom operators

/**
 * Take the specified number of items from the observable, then complete. If no number, do not take()
 * @param toTake The number of items to take before completing; take "forever" if falsey
 */
const takeMaybe = (toTake?: number) => <T> (o: Observable<T>) => toTake ? o.pipe(take(toTake)) : o;



/**
 * Sum the doubled, odd numbered items emitted by the observable
 * @param toTake The number of items to take before completing; take 10 if falsey
 */
export const oddDoublerOp = (toTake = 10) => (o: Observable<number>) =>
  o.pipe(
    takeMaybe(toTake),
    filter(i => i % 2 === 1),
    map(i => i * 2),
    reduce((acc, curr) => acc + curr, 0)
  );

// #endregion Custom operators


// #region Play()
export function play(...args: any[]) {

  const ticker$ = interval(50); // tick tick tick

  /**
   * To double the odd integers emitted by interval and sum them ...
   * pipe with RxJS array-like operators
   */
  const result$ = ticker$.pipe(oddDoublerOp(10));

  return result$; // 'cause we love observables
}
// #endregion Play()
