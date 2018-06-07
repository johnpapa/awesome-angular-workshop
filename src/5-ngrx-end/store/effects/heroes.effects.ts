import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { HeroesDataService } from '../../data-services';
import * as HeroActions from '../actions';
import { HeroAction } from '../actions';
import { DeleteHeroSuccess, DeleteHero, AddHero } from '../actions';

@Injectable()
export class HeroesEffects {
  constructor(
    private actions$: Actions,
    private dataService: HeroesDataService
  ) {}

  @Effect()
  loadHeroes$ = this.actions$.pipe(
    ofType(HeroActions.LOAD_HEROES),
    concatMap(() =>
      this.dataService.getAll().pipe(
        map(heroes => new HeroActions.LoadHeroesSuccess(heroes)),
        catchError(error => of(new HeroActions.LoadHeroesError(error)))
      )
    )
  );

  // @Effect()
  // loadHeroes$ = this.actions$.ofType(HeroActions.LOAD_HEROES).pipe(
  //   concatMap(() =>
  //     this.dataService.getAll().pipe(
  //       map(heroes => new HeroActions.LoadHeroesSuccess(heroes)),
  //       catchError(error => of(new HeroActions.LoadHeroesError(error)))
  //     )
  //   )
  // );

  // Step 1. Add an effect to ADD a hero

  @Effect()
  addHero$ = this.actions$.pipe(
    ofType(HeroActions.ADD_HERO),
    concatMap((action: HeroAction) =>
      this.dataService.add(action.payload).pipe(
        map(hero => new HeroActions.AddHeroSuccess(hero)),
        catchError(error => of(new HeroActions.AddHeroError(error)))
      )
    )
  );

  // BONUS: the remaining effects.

  // Ward ...
  // I just refactored these to the style you just showed me. But we have a payload error

  @Effect()
  deleteHero$ = this.actions$.pipe(
    ofType(HeroActions.DELETE_HERO),
    concatMap((action: HeroAction) =>
      this.dataService.delete(action.payload).pipe(
        map(hero => new HeroActions.DeleteHeroSuccess()),
        catchError(error => of(new HeroActions.DeleteHeroError(error)))
      )
    )
  );

  // npm run 5-ngrx-begin
  // BACK PORT HeroAction to 5-ngrx-begin
  // we did not use an action in the concatMap in the begin
  // I just thought it might make the flow easier. Up to you.
  // Does it run?

  @Effect()
  updateHero$ = this.actions$.pipe(
    ofType(HeroActions.UPDATE_HERO),
    concatMap((action: HeroAction) =>
      this.dataService.update(action.payload).pipe(
        // return the updated hero if there is one, else the hero in the Update Action payload
        map(hero => new HeroActions.UpdateHeroSuccess(hero || action.payload)),
        catchError(error => of(new HeroActions.UpdateHeroError(error)))
      )
    )
  );
}
