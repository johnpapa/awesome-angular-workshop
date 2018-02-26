import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService, DataServiceConfig } from './data.service';
import { HttpUrlGenerator } from './http-url-generator';
import { ToastService } from '../core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { combineLatest, finalize, take, tap } from 'rxjs/operators';

/**
 * CQRS DataService
 * CRUD commands produce HTTP requests
 * Observable query properties (e.g., entities$) report results
 */
@Injectable()
export class CqrsDataService<T extends {id: number}> extends DataService<T> {

  private _entities: T[] = []; // simplistic cache of entities
  private _entities$ = new BehaviorSubject(this._entities);
  private _filterObserver = new BehaviorSubject('');

  /** live list of cached entities */
  entities$: Observable<T[]> = this._entities$;

  /** User's filter pattern */
  filterObserver: Observer<string> = this._filterObserver;

  /** Entities filtered by those criteria */
  filteredEntities$ = this._filterObserver.pipe(
    combineLatest(this._entities$, this.filterProjector)
  );

  /** true when getting all the entities */
  loading$ = new BehaviorSubject(false);

  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() toastService: ToastService,
    @Optional() config: DataServiceConfig
  ) {
    super(entityName, http, httpUrlGenerator, toastService, config);
  }

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

}
