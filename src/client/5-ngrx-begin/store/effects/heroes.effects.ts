import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concatMap, catchError, map } from 'rxjs/operators';

import * as HeroActions from '../actions';
import { HeroesDataService } from '../../data-services';

@Injectable()
export class HeroesEffects {

  constructor(
    private actions$: Actions,
    private dataService: HeroesDataService,
  ) {}

  @Effect()
  loadHeroes$ = this.actions$.ofType(HeroActions.LOAD_HEROES).pipe(
    concatMap(() => this.dataService.getAll().pipe(
        map(heroes => new HeroActions.LoadHeroesSuccess(heroes)),
        catchError(error => of(new HeroActions.LoadHeroesError(error)))
      )
    )
  );

  // Step 1. Add an effect to ADD a hero

  // @Effect()
  // addHero$ = this.actions$.ofType<HeroActions.AddHero>(HeroActions.ADD_HERO).pipe(
  //   concatMap(action => this.dataService.add(action.payload).pipe(
  //       map(hero => new HeroActions.AddHeroSuccess(hero)),
  //       catchError(error => of(new HeroActions.AddHeroError(error)))
  //     )
  //   )
  // );
}

