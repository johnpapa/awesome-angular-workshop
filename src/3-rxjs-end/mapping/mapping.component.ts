import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  concatMap, exhaustMap, mergeMap, switchMap,
  endWith,  scan, map, startWith
} from 'rxjs/operators';

import { addImg } from './addImg';

interface Results {
  dropped: number;
  completed: number;
}

// tslint:disable:member-ordering
@Component({
  templateUrl: './mapping.component.html'
})
export class MappingComponent {
  @ViewChild('svg') svg: ElementRef;

  private _mapOpName = 'mergeMap';

  /** Name of the map operator to use */
  get mapOpName() { return this._mapOpName; }
  set mapOpName(name: string) {
    this._mapOpName = name;
    this.resetResults$();
  }

  /** Subject/Observable of clicks of the drop button */
  click$ = new Subject();

  /** Observable of drop button clicks that is reset when results.dropped goes to zero */
  clicks$: Observable<number>;

  /** Observable of results from clicking the drop button. */
  results$: Observable<Results>;

  constructor() {
    this.resetResults$(); // start with default, mergeMap
  }

  /**
   * Reset the observable of results (results$).
   * Emits results built from combining animation observables with the selected map operator.
   * Animation observables are (or may be) created after each drop-click.
   * @param mapOpName Name of the map operator to use
   */
  resetResults$() {
    // Return an image animation observable that emits an action: { type: string } when
    // 1) the image starts to drop,
    // 2) after each animation frame, and
    // 3) when it stops
    const add = () =>  addImg(this.svg.nativeElement as SVGSVGElement).pipe(
      // when the ball animates, emit an action
      map((e) => ({ type: 'IMG_ANIMATE', e })), // for diagnostic purposes
      // it starts with a IMG_START action
      startWith({ type: 'IMG_START' }),
      // it ends with a IMG_END action
      endWith({ type: 'IMG_END' }),
    );

    // Pick the selected map operator
    const mop = this.mapOpName;
    // tslint:disable: deprecation
    const mapOperator =
      mop === 'exhaustMap' ? exhaustMap :
      mop === 'concatMap' ? concatMap :
      mop === 'switchMap' ? switchMap :
      mergeMap; // default to mergeMap
    // tslint:enable: deprecation

    // Observable of flattened add()observables, mapped with the selected map operator
    const mapped$ = this.click$.pipe(
      mapOperator(add) // e.g., mergeMap(add)
    );


    // Observable of mapped animations, transformed into results for display
    this.results$ = mapped$.pipe(
      // use a scan for state management (we'll just mutate state, it's okay here)
      scan((state: Results, action: {type: string}) => {
        switch (action.type) {
          // when you get a IMG_START, increment dropped counter
          case 'IMG_START':
            state.dropped++;
            break;
          // when you get a IMG_END, increment the completed counter
          case 'IMG_END':
            state.completed++;
            break;
          // otherwise we don't care
        }
        return state;
      }, { dropped: 0, completed: 0 }),

      // Begin with zeroed-out results each time we reset results$
      startWith({ dropped: 0, completed: 0 })
    );

    // Reset the clicks count by recreating the observable
    this.clicks$ = this.click$.pipe(
      scan((count) => count + 1, 0),
      startWith(0)
    );
  }

}
