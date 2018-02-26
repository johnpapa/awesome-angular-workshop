// Messy evolving version. Should still work
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest, finalize, take, tap } from 'rxjs/operators';

import { HeroesDataService } from '../data-services';
import { Hero, ToastService } from '../core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class HeroesService {

  constructor(
    private heroesDataService: HeroesDataService,
    private store: Store<fromStore.EntityCacheState>,
    private toastService: ToastService
  ) {
    // this.createLocalSelectors$();
    this.createSelectors$();

    this.wireFilteredEntities();
  }

  // region Queries

  /** live list of cached Heroes */
  entities$: Observable<Hero[]>;

  /** Entities filtered by those criteria */
  filteredEntities$: Observable<Hero[]>;

  /** User's filter pattern */
  filterObserver: Observer<string>;

  /** true when getting all the entities */
  loading$: Observable<boolean>;

  // region Selectors$

  // Create selectors$ locally in this class
  createLocalSelectors$() {
    const entityCache$ = this.store.select<fromStore.EntityCacheState>((state: any) => state[fromStore.ENTITY_CACHE_NAME]);

    const heroesCollection$ = entityCache$.select<fromStore.HeroesState>(
      state => state ? state.hero : fromStore.initialHeroesState );

    this.entities$ = heroesCollection$.select(state => state.data);
    this.loading$ = heroesCollection$.select(state => state ? state.loading : false);
  }

  // Create selectors$ with selectors$ helpers
  createSelectors$() {
    const selectors$ = fromStore.createHeroesSelectors$(this.store);
    this.entities$ = selectors$.heroes$;
    this.loading$ = selectors$.loading$;
  }

  // endregion Selectors$

  // endregion Queries

  // region CRUD Commands

  /** Get all heroes with ngrx */
  getAll() {
    // Create request action and dispatch
    const action = new fromStore.LoadHeroes();
    this.store.dispatch(action);

    // Get from the database with dispatch (not effects)
    // Comment out after adding effects
    this._getAllHeroesAndDispatch();

    // DEBUGGING
    // this.heroes$.pipe(take(1)).subscribe(
    //   heroes => console.log(heroes),
    //   null,
    //   () => console.log('heroes$ debugging completed')
    // );
  }


  // region DataService + Dispatch
  private _getAllHeroesAndDispatch() {
    // Dispatch as side-effects of the HTTP response
    this.heroesDataService.getAll().subscribe(
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

  /** Add entity to the database. Update entities$. */
  add(entity: Hero): void {
    this.toastService.openSnackBar('Not implemented yet', 'Add');
  }

  /** Delete entity-by-id from the database. Update entities$. */
  delete(id: number | string ): void {
    this.toastService.openSnackBar('Not implemented yet', 'Delete');
  }

  /** Update the entity in the database.  Update entities$. */
  update(entity: Hero): void {
    this.toastService.openSnackBar('Not implemented yet', 'Update');
  }
  // endregion CRUD Commands

  // region wireFilteredEntities
  private wireFilteredEntities() {
    const filterObserver = new BehaviorSubject('');
    this.filterObserver = filterObserver;
    this.filteredEntities$ = filterObserver.pipe(
      combineLatest(this.entities$, this.filterProjector)
    );
  }

  protected filterProjector(filterValue: string, entities: Hero[]) {
    const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
    return regEx ?
      entities.filter((e: any) => e.name && e.name.match(regEx)) :
      entities;
  }
  // endregion wireFilteredEntities

}
