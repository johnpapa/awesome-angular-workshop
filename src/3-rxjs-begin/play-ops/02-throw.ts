// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

export function play(...args: any[]) {

  const numbers$ = Rxjs.of(10, 20, 30, 40, 50);

  const observable$ = numbers$.pipe(
    op.map(_ => { throw new Error('Errorrrr'); })
  );

  return observable$;

}
