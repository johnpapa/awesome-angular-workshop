import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { pipe } from 'rxjs/util/pipe';

import { catchError, combineLatest, delay, finalize, map, tap, timeout } from 'rxjs/operators';

import { DataServiceError } from './data-service-error';
import { HttpMethods, RequestData } from './index';
import { HttpUrlGenerator } from './http-url-generator';
import { ToastService } from '../core';

// Pass the observable straight through
export const noDelay = <T>(source: Observable<T>) => source;

/**
 * Optional configuration settings for an entity collection data service
 * such as the `DataService<T>`.
 */
export abstract class DataServiceConfig {
  /** root path of the web api (default: 'api') */
  root?: string;
  /** Is a DELETE 404 really OK? (default: true) */
  delete404OK?: boolean;
  /** Simulate GET latency in a demo (default: 0) */
  getDelay?: number;
  /** Simulate save method (PUT/POST/DELETE) latency in a demo (default: 0) */
  saveDelay?: number;
  /** request timeout in MS (default: 0)*/
  timeout?: number; //
}

const dummyToastService: any = { openSnackBar: () => {} };

/**
 * A basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
export class DataService<T extends {id: number | string}> {
  protected _name: string;
  protected delete404OK: boolean;
  protected entityName: string;
  protected entityUrl: string;
  protected entitiesUrl: string;
  protected getDelay: typeof noDelay;
  protected saveDelay: typeof noDelay;
  protected timeout: typeof noDelay;

  get name() { return this._name; }

  constructor(
    entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    protected toastService?: ToastService,
    config?: Partial<DataServiceConfig>,
  ) {
    this._name = `${entityName} DataService`;
    this.entityName = entityName;
    const {
      root = 'api',
      delete404OK = true,
      getDelay = 0,
      saveDelay = 0,
      timeout: to = 0,
    } = (config || {});
    this.delete404OK = delete404OK;
    this.entityUrl = httpUrlGenerator.entityResource(entityName, root);
    this.entitiesUrl = httpUrlGenerator.collectionResource(entityName, root);
    this.getDelay = getDelay ? delay(getDelay) : noDelay;
    this.saveDelay = saveDelay ? delay(saveDelay) : noDelay;
    this.timeout = to ? timeout(to) : noDelay;
    this.toastService = toastService || dummyToastService;
  }

  // cache of entities
  private entities: T[] = []; // simplistic

  /** live list of cached entities */
  entities$ = new BehaviorSubject(this.entities);

  /** User's filter pattern */
  filterObserver = new BehaviorSubject('');

  /** Entities filtered by those criteria */
  filteredEntities$ = this.filterObserver.pipe(
    combineLatest(this.entities$, this.filterProjector)
  );

  /** true when getting all the entities */
  loading$ = new BehaviorSubject(false);

  /** Updates cached entities and publishes */
  private next(newEntities: T[]): void {
    this.entities$.next(newEntities);
    this.entities = newEntities;
  }

  add(entity: T): void {
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to add`);
    this.execute('POST', this.entityUrl, entityOrError).pipe(
      // pessimistic add
      tap(added => this.next(this.entities.concat(added)))
    ).subscribe();
  }

  delete(id: number | string ): void {
    let err: Error;
    if (id == null) {
      err = new Error(`No "${this.entityName}" key to delete`);
    }
    // Optimistic delete
    this.entities$.next(this.entities.filter(e => e.id !== id));
    this.execute('DELETE', this.entityUrl + id, err).subscribe();
  }

  getAll(): void {
    this.loading$.next(true);
    this.execute('GET', this.entitiesUrl).pipe(
      tap(results => this.next(results)),
      finalize(() => this.loading$.next(false))
    ).subscribe();
  }

  update(entity: T): void {
    const id = entity && entity.id;
    const entityOrError = id == null ?
      new Error(`No "${this.entityName}" update data or id`) :
      entity;
    this.execute('PUT', this.entityUrl + id, entityOrError ).pipe(
      // pessimistic update
      tap(updated => {
        this.next(
          this.entities.map(e => e.id === id ? updated : e)
        );
      })
    ).subscribe();
  }

  protected execute(
    method: HttpMethods,
    url: string,
    data?: any, // data, error, or undefined/null
    options?: any): Observable<any> {

    const req: RequestData = { method, url, options };

    if (data instanceof Error) {
      return this.handleError(req)(data);
    }

    const tail = pipe(
      method === 'GET' ? this.getDelay : this.saveDelay,
      tap(() => {
        this.toastService.openSnackBar('Success', `${this.name} ${method}`);
      }),
      this.timeout,
      catchError(this.handleError(req)),
    );

    switch (method) {
      case 'DELETE': {
        return this.http.delete(url, options).pipe(tail);
      }
      case 'GET': {
        return this.http.get(url, options).pipe(tail);
      }
      case 'POST': {
        return this.http.post(url, data, options).pipe(tail);
      }
      case 'PUT': {
        return this.http.put(url, data, options)
          .pipe(
            map(updated => {
              // Return updated with merged updated data (if any).
              // If no data from server,
              const noData = Object.keys(updated || {}).length === 0;
              // assume the server made no additional changes of its own and return original data.
              return noData ? data : updated;
            }),
            tail
          );
      }
      default: {
        const error = new Error('Unimplemented HTTP method, ' + method);
        return new ErrorObservable(error);
      }
    }
  }

  protected handleError(reqData: RequestData) {
    return (err: any) => {
      const ok = this.handleDelete404(err, reqData);
      if (ok) { return ok; }
      const error = new DataServiceError(err, reqData);
      this.toastService.openSnackBar(error.message, `${this.name} ${reqData.method}`);
      return new ErrorObservable(error);
    };
  }

  protected filterProjector(filterValue: string, entities: T[]) {
    const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
    return regEx ?
      entities.filter((e: any) => e.name && e.name.match(regEx)) :
      entities;
  }

  protected handleDelete404(error: HttpErrorResponse, reqData: RequestData) {
    if (error.status === 404 && reqData.method === 'DELETE' && this.delete404OK) {
      return of({});
    }
    return undefined;
  }
}



