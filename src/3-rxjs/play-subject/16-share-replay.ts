import { shareReplay } from 'rxjs/operators';
import { timerData$ } from '../core/helpers';

/**
 * Normal Observables notify only a single subscriber (uni-cast)
 * and re-execute each time they are subscribed.
 * ShareReplay multi-casts with a ReplaySubject
 */
export function play(...args: any[]) {

  // Starts like "11-observable" ... and pipes on shareReplay(1)
  // Now it's multi-cast with a buffer of the last next'd value
  return timerData$.pipe(shareReplay(1));
}
