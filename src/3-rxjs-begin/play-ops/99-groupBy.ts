// #region imports
// tslint:disable:member-ordering
// Namespace to get something you need
import * as Rxjs from 'rxjs';
import * as op from 'rxjs/operators';
// #endregion imports

export function play(...args: any[]) {
  interface Obj {
    id: number;
    name: string;
  }

  const observable$ = Rxjs.of(
    {id: 1, name: 'javascript'},
    {id: 2, name: 'parcel'},
    {id: 2, name: 'webpack'},
    {id: 1, name: 'typescript'},
    {id: 3, name: 'tslint'}
  ).pipe(
    op.groupBy(p => p.id, p => p.name),
    op.mergeMap( (group$) => group$.pipe(op.reduce((acc, cur) => [...acc, cur], ['' + group$.key]))),
    op.map((arr: string[]) => ({'id': parseInt(arr[0], 10), 'values': arr.slice(1)})),


    // op.concatMap(_ => Rxjs.throwError('error'))
    // op.map(_ => { throw new Error('Errorrrr'); })
  );

  return observable$;

}
