import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hero } from '../core';
import { CqrsDataService, DataServiceConfig, HttpUrlGenerator } from '../data-services';
import { ToastService } from '../core';

// region ngrx-related imports

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

// endregion ngrx-related imports

@Injectable()
export class HeroesService extends CqrsDataService<Hero> {

  heroes$: Observable<Hero[]>;
  heroesLoading$: Observable<boolean>;

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() toastService: ToastService,
    @Optional() config: DataServiceConfig,

    private store: Store<fromStore.EntityCacheState>
  ) {
    super('Hero', http, httpUrlGenerator, toastService, config);

    this.ngrxSetup();
  }

  ////////// New Ngrx Stuff ///////////

  private ngrxSetup() {
    // this.createSelectors$();
    this.createSelectors$2();
  }

  /** Get all heroes with ngrx */
  getAllHeroes() {
    // Initiate the request
    const action = new fromStore.LoadHeroes();
    this.store.dispatch(action);

    // Get from the database
    this._getAllHeroesAndDispatch();

    // DEBUGGING
    // this.heroes$.pipe(take(1)).subscribe(
    //   heroes => console.log(heroes),
    //   null,
    //   () => console.log('heroes$ debugging completed')
    // );
  }

  // region Selectors$

  // Create selectors$ in this class
  createSelectors$() {
    const entityCache$ = this.store.select<fromStore.EntityCacheState>((state: any) => state[fromStore.ENTITY_CACHE_NAME]);

    const heroesCollection$ = entityCache$.select<fromStore.HeroesState>(
      state => state ? state.hero : fromStore.initialHeroesState );

    this.heroes$ = heroesCollection$.select(state => state.data);
    this.heroesLoading$ = heroesCollection$.select(state => state ? state.loading : false);
  }

  // Create selectors$ with selectors$ helpers
  createSelectors$2() {
    const selectors$ = fromStore.createHeroesSelectors$(this.store);
    this.heroes$ = selectors$.heroes$;
    this.heroesLoading$ = selectors$.loading$;
  }

  // endregion Selectors$

  // region DataService + Dispatch

  private _getAllHeroesAndDispatch() {
    // Dispatch as side-effects of the HTTP response
    this._getAll().subscribe(
      heroes => {
        const action = new fromStore.LoadHeroesSuccess(heroes);
        this.store.dispatch(action);
      },
      error => {
        const action = new fromStore.LoadHeroesError(error);
        this.store.dispatch(action);
      },
      // () => console.log('_getAllHeroesAndDispatch completed')
    );
  }
  // endregion DataService + Dispatch
}
