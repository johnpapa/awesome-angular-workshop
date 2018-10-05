// Clean Ngrx version
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { Hero, ToastService } from '../core';
import { HeroesDataService } from '../data-services';
import { FilterObserver } from '../shared/filter';
import * as fromStore from '../store';

@Injectable()
export class HeroService {
  constructor(
    private heroesDataService: HeroesDataService,
    private store: Store<fromStore.EntityCacheState>,
    private toastService: ToastService
  ) {
    this.createSelectors$();
    this.wireFilteredEntities();
  }

  // region Queries

  /** live list of cached Heroes */
  entities$: Observable<Hero[]>;

  /** Entities filtered by those criteria */
  filteredEntities$: Observable<Hero[]>;

  /** User's filter pattern */
  filterObserver: FilterObserver;

  /** true when getting all the entities */
  loading$: Observable<boolean>;

  createSelectors$() {
    const selectors$ = fromStore.createHeroesSelectors$(this.store);
    this.entities$ = selectors$.heroes$;
    this.loading$ = selectors$.loading$;
  }

  // endregion Queries

  // region CRUD Commands

  /** Dispatch GetAll request action */
  getAll() {
    const action = new fromStore.LoadHeroes();
    this.store.dispatch(action);
  }

  // Step 1. Change so it dispatches the ADD action

  /** Dispatch add hero request action */
  add(hero: Hero): void {
    this.toastService.openSnackBar('Not implemented yet', 'Add');
    // if (hero) {
    //   const action = new fromStore.AddHero(hero);
    //   this.store.dispatch(action);
    // }
  }

  /** Dispatch hero delete-by-id request action */
  delete(id: number): void {
    this.toastService.openSnackBar('Not implemented yet', 'Delete');
  }

  /** Dispatch hero update request action */
  update(hero: Hero): void {
    this.toastService.openSnackBar('Not implemented yet', 'Update');
  }
  // endregion CRUD Commands

  // region wireFilteredEntities
  wireFilteredEntities() {
    const filterObserver = new BehaviorSubject('');

    this.filterObserver = {
      filter$: filterObserver.asObservable(),
      setFilter: filterValue => filterObserver.next(filterValue)
    };

    this.filteredEntities$ = this.filterObserver.filter$.pipe(
      combineLatest(this.entities$, this.filterProjector)
    );
  }

  protected filterProjector(filterValue: string, entities: Hero[]) {
    const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
    return regEx
      ? entities.filter((e: any) => e.name && e.name.match(regEx))
      : entities;
  }
  // endregion wireFilteredEntities
}
