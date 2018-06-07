import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { combineLatest, finalize, tap } from 'rxjs/operators';
import { ToastService } from '../core';
import { FilterObserver } from '../shared/filter';
import { DataService, DataServiceConfig } from './data.service';
import { HttpUrlGenerator } from './http-url-generator';



// Not injectable because generic

/**
 * CQRS Caching DataService
 * CRUD commands produce HTTP requests and return void
 * Observable query properties (e.g., entities$) report changes in cache
 */
export class CqrsDataService<T extends {id: number}> extends DataService<T> {

  private _entities: T[] = []; // simplistic cache of entities
  private _entities$ = new BehaviorSubject(this._entities);

  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    toastService?: ToastService,
    config?: DataServiceConfig
  ) {
    super(entityName, http, httpUrlGenerator, toastService, config);
    this.wireFilteredEntities();
  }

  // region Queries

  /** live list of cached entities */
  entities$: Observable<T[]> = this._entities$;

  /** Entities filtered by those criteria */
  filteredEntities$: Observable<T[]>;

  /** User's filter pattern */
  filterObserver: FilterObserver;

  /** true when getting all the entities */
  loading$ = new BehaviorSubject(false);

  // endregion Queries

  // region Commands

  /** Updates cached entities and publishes */
  private next(newEntities: T[]): void {
    this._entities$.next(newEntities);
    this._entities = newEntities;
  }

  /** Add entity to the database. Update entities$. */
  add(entity: T): void {
    this._add(entity).pipe(
      // pessimistic add
      tap(added => this.next(this._entities.concat(added)))
    ).subscribe();
  }

  /** Delete entity-by-id from the database. Update entities$. */
  delete(id: number | string ): void {
    // Optimistic delete
    this._entities$.next(this._entities.filter(e => e.id !== id));
    this._delete(id).subscribe();
  }

  /** Get all entities from the database. Update entities$ and loading$ indicator. */
  getAll(): void {
    this.loading$.next(true);
    this._getAll().pipe(
      tap(results => this.next(results)),
      finalize(() => this.loading$.next(false))
    ).subscribe();
  }

  /** Update the entity in the database.  Update entities$. */
  update(entity: T): void {
    const id = entity && entity.id;
    this._update(entity).pipe(
      // pessimistic update
      tap(updated => {
        this.next(
          this._entities.map(e => e.id === id ? updated : e)
        );
      })
    ).subscribe();
  }

  // endregion Commands

  // region wireFilteredEntities
  protected wireFilteredEntities() {
    const filterObserver = new BehaviorSubject('');

    this.filterObserver = {
      filter$: filterObserver.asObservable(),
      setFilter: filterValue => filterObserver.next(filterValue)
    };

    this.filteredEntities$ = this.filterObserver.filter$.pipe(
      combineLatest(this.entities$, this.filterProjector)
    );
  }

  /**
   * Filter entities by the filterValue.
   * This one ignores filter and returns entities.
   * Override in sub-class.
   */
  protected filterProjector(filterValue: string, entities: T[]) {
    return entities;
  }
  // endregion wireFilteredEntities
}
