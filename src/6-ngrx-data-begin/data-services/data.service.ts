import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { catchError, delay, map, tap, timeout } from 'rxjs/operators';
import { ToastService } from '../core';
import { DataServiceError } from './data-service-error';
import { HttpUrlGenerator } from './http-url-generator';
import { HttpMethods, RequestData } from './index';




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

// Not injectable because generic

/**
 * A basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
export class DataService<T extends {id: number | string}> {

  // region setup

  /** Name of the DataService, usually the entity type name */
  readonly name: string;
  protected delete404OK: boolean;
  protected entityName: string;
  protected entityUrl: string;
  protected entitiesUrl: string;
  protected getDelay: typeof noDelay;
  protected saveDelay: typeof noDelay;
  protected timeout: typeof noDelay;

  constructor(
    entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    protected toastService?: ToastService,
    config?: Partial<DataServiceConfig>,
  ) {
    this.name = `${entityName} DataService`;
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
    this.toastService = toastService || ({ openSnackBar: () => {} } as any);
  }
  // endregion setup

  // region Observable methods

  /** Add entity to the database. Return observable of added entity. */
  protected _add(entity: T): Observable<T> {
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to add`);
    return this._execute('POST', this.entityUrl, entityOrError);
  }

  /** Delete entity-by-id from the database. Return observable of null. */
  protected _delete(id: number | string ): Observable<null> {
    let err: Error;
    if (id == null) {
      err = new Error(`No "${this.entityName}" key to delete`);
    }
    return this._execute('DELETE', this.entityUrl + id, err);
  }

  /** Get all entities from the database as Observable */
  protected _getAll(): Observable<T[]> {
    return this._execute('GET', this.entitiesUrl);
  }

  /** Update the entity in the database. Return Observable of updated entity. */
  protected _update(entity: T): Observable<T> {
    const id = entity && entity.id;
    const entityOrError = id == null ?
      new Error(`No "${this.entityName}" update data or id`) :
      entity;
    return this._execute('PUT', this.entityUrl + id, entityOrError);
  }
  // endregion Observable methods

  // region execute
  protected _execute(
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
        return throwError(error);
      }
    }
  }
  // endregion execute

  // region execute helpers
  protected handleError(reqData: RequestData) {
    return (err: any) => {
      const ok = this.handleDelete404(err, reqData);
      if (ok) { return ok; }
      const error = new DataServiceError(err, reqData);
      this.toastService.openSnackBar(error.message, `${this.name} ${reqData.method}`);
      return throwError(error);
    };
  }

  protected handleDelete404(error: HttpErrorResponse, reqData: RequestData) {
    if (error.status === 404 && reqData.method === 'DELETE' && this.delete404OK) {
      return of({});
    }
    return undefined;
  }
  // endregion execute helpers
}
