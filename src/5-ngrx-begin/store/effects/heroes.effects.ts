import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { HeroesDataService } from '../../data-services';
import * as HeroActions from '../actions';

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

  // Step 1. Add an effect to ADD a hero

  // @Effect()
  // addHero$ = this.actions$
  //   .ofType<HeroActions.AddHero>(HeroActions.ADD_HERO)
  //   .pipe(
  //     concatMap(action =>
  //       this.dataService.add(action.payload).pipe(
  //         map(hero => new HeroActions.AddHeroSuccess(hero)),
  //         catchError(error => of(new HeroActions.AddHeroError(error)))
  //       )
  //     )
  //   );
}
