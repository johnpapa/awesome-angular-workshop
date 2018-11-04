// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

export function play(...args: any[]) {

  const numbers$ = Rxjs.of(10, 20, 30, 40, 50);

  const observable$ = numbers$.pipe(
    // DISCUSS: Do you know why concatMap and not map?
    op.concatMap(_ => Rxjs.throwError('throwErrorrrrrr'))
  );

  return observable$;

}
