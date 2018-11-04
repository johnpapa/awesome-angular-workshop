import { timerData$ } from '../core/helpers';

  /**
   * Normal Observables notify only a single subscriber (uni-cast)
   * and re-execute each time they are subscribes.
   */
export function play(...args: any[]) {

  return timerData$;


  // HOW WOULD THIS CHANGE THINGS?
  // return data$.pipe(op.shareReplay(1));
}
