import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  concatMap, exhaustMap, mergeMap, switchMap,
  endWith,  ignoreElements, scan, startWith, tap
} from 'rxjs/operators';

import { addImg } from './addImg';

interface Results {
  clicks: number;
  dropped: number;
  completed: number;
}

@Component({
  templateUrl: './mapping.component.html'
})
export class MappingComponent {
  @ViewChild('svg') svg: ElementRef;

  /** Subject/Observable of clicks of the drop button */
  click$ = new Subject();

  /** Name of the map operator to use. */
  mapOpName = 'mergeMap'; // initial map operator

  /**
   * Observable of results from clicking the drop button given the current map operator.
   * Emits {clicks, dropped, completed} counts built from combining clicks with
   * animation observables, created and flattened by the selected map operator.
   */
  results$: Observable<Results>;

  constructor() {
    this.reset(); // start with initial map operator
  }

  /** Reset the results$ observable. */
  reset() {
    // Pick the map operator by the selected name
    // tslint:disable: deprecation
    const mapOperator =
      this.mapOpName === 'exhaustMap' ? exhaustMap :
      this.mapOpName === 'concatMap' ? concatMap :
      this.mapOpName === 'switchMap' ? switchMap :
      mergeMap; // default
    // tslint:enable: deprecation

    // Create a new animation observable that
    // emits 'START' when the animation observable begins and
    // emits 'END' when the observable completes and
    // ignores the emitted animation values.
    const animation = () => addImg(this.svg.nativeElement).pipe(
      ignoreElements(),
      startWith('START'),
      endWith('END'),
    );

    // Initialize results
    const results = { clicks: 0, dropped: 0, completed: 0 };

    // Observable of clicks mapped into animation actions, transformed into results for display
    this.results$ = this.click$.pipe(
      // Bump the click count
      tap(() => results.clicks++),

      // Map the button clicks into new animation observables (emitting 'START' and 'STOP').
      // Animation observables are created and flattened with the selected map operator.
      mapOperator(animation), // e.g., mergeMap(animation)

      // Scan animation actions into the emitted results object
      scan((state: Results, action: string) => {
        if (action === 'START') {
          state.dropped++;
        } else if (action === 'END') {
          state.completed++;
        }
        return state;
      }, results),

      // Begin with initial (zero-ed out) results
      startWith(results)
    );
  }
}
