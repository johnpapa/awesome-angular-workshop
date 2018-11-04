import { of, interval } from 'rxjs';

import { filter, map, reduce, scan, take } from 'rxjs/operators';

export function play(...args: any[]) {

  const arr$ = interval(50); // tick tick tick

  /**
   * To double the odd integers emitted by interval and sum them ...
   * pipe with RxJS array-like operators
   */
  const result$ = arr$.pipe(
    take(10),  //  WHAT IF WE LEAVE THIS OUT?
    filter(i => i % 2 === 1),
    map(i => i * 2),
    scan((acc, curr) => acc + curr, 0)
  );

  return result$; // 'cause we love observables
}
