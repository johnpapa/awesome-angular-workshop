// // Messy evolving version. Should still work
// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { combineLatest } from 'rxjs/operators';
// import { Hero, ToastService } from '../core';
// import { HeroesDataService } from '../data-services';
// import { FilterObserver } from '../shared/filter';
// import * as fromStore from '../store';




// @Injectable()
// export class HeroService {

//   constructor(
//     private heroesDataService: HeroesDataService,
//     private store: Store<fromStore.EntityCacheState>,
//     private toastService: ToastService
//   ) {
//     // this.createLocalSelectors$();
//     this.createSelectors$();

//     this.wireFilteredEntities();
//   }

//   // region Queries

//   /** live list of cached Heroes */
//   entities$: Observable<Hero[]>;

//   /** Entities filtered by those criteria */
//   filteredEntities$: Observable<Hero[]>;

//   /** User's filter pattern */
//   filterObserver: FilterObserver;

//   /** true when getting all the entities */
//   loading$: Observable<boolean>;

//   // region Selectors$

//   // Create selectors$ locally in this class
//   createLocalSelectors$() {
//     const entityCache$ = this.store.select<fromStore.EntityCacheState>((state: any) => state[fromStore.ENTITY_CACHE_NAME]);

//     const heroesCollection$ = entityCache$.select<fromStore.HeroesState>(
//       state => state ? state.hero : fromStore.initialHeroesState );

//     this.entities$ = heroesCollection$.select(state => state.data);
//     this.loading$ = heroesCollection$.select(state => state ? state.loading : false);
//   }

//   // Create selectors$ with selectors$ helpers
//   createSelectors$() {
//     const selectors$ = fromStore.createHeroesSelectors$(this.store);
//     this.entities$ = selectors$.heroes$;
//     this.loading$ = selectors$.loading$;
//   }

//   // endregion Selectors$

//   // endregion Queries

//   // region CRUD Commands

//   /** Get all heroes with ngrx */
//   getAll() {
//     // Create request action and dispatch
//     const action = new fromStore.LoadHeroes();
//     this.store.dispatch(action);

//     // Get from the database with dispatch (not effects)
//     // Comment out after adding effects
//     this._getAllHeroesAndDispatch();

//     // DEBUGGING
//     // this.heroes$.pipe(take(1)).subscribe(
//     //   heroes => console.log(heroes),
//     //   null,
//     //   () => console.log('heroes$ debugging completed')
//     // );
//   }


//   // region DataService + Dispatch
//   private _getAllHeroesAndDispatch() {
//     // Dispatch as side-effects of the HTTP response
//     this.heroesDataService.getAll().subscribe(
//       heroes => {
//         const action = new fromStore.LoadHeroesSuccess(heroes);
//         this.store.dispatch(action);
//       },
//       error => {
//         const action = new fromStore.LoadHeroesError(error);
//         this.store.dispatch(action);
//       },
//       // () => console.log('_getAllHeroesAndDispatch completed')
//     );
//   }
//   // endregion DataService + Dispatch

//   /** Dispatch add hero request action */
//   add(hero: Hero): void {
//     this.toastService.openSnackBar('Not implemented yet', 'Add');
//   }


//   /** Dispatch hero delete-by-id request action */
//   delete(id: number ): void {
//     this.toastService.openSnackBar('Not implemented yet', 'Delete');
//   }

//   /** Dispatch hero update request action */
//   update(hero: Hero): void {
//     this.toastService.openSnackBar('Not implemented yet', 'Update');
//   }
//   // endregion CRUD Commands

//   // region wireFilteredEntities
//   wireFilteredEntities() {
//     const filterObserver = new BehaviorSubject('');

//     this.filterObserver = {
//       filter$: filterObserver.asObservable(),
//       setFilter: filterValue => filterObserver.next(filterValue)
//     };

//     this.filteredEntities$ = this.filterObserver.filter$.pipe(
//       combineLatest(this.entities$, this.filterProjector)
//     );
//   }

//   protected filterProjector(filterValue: string, entities: Hero[]) {
//     const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
//     return regEx ?
//       entities.filter((e: any) => e.name && e.name.match(regEx)) :
//       entities;
//   }
//   // endregion wireFilteredEntities

// }
