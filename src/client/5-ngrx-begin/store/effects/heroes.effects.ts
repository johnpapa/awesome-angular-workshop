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

}

