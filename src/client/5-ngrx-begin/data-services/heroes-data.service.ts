import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, ToastService } from '../core';
import { DataService, DataServiceConfig } from './data.service';
import { HttpUrlGenerator } from './http-url-generator';



/**
 * Heroes HTTP DataService
 * Wraps and exposes the protected base DataService CRUD methods
 */
@Injectable()
export class HeroesDataService extends DataService<Hero> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() toastService: ToastService,
    @Optional() config: DataServiceConfig
  ) {
    super('Hero', http, httpUrlGenerator, toastService, config);
  }

  /** Add entity to the database. Update entities$. */
  add(entity: Hero): Observable<Hero> { return this._add(entity); }

  /** Delete entity-by-id from the database. Update entities$. */
  delete(id: number | string ): Observable<null> { return this._delete(id); }

  /** Get all entities from the database. Update entities$ and loading$ indicator. */
  getAll(): Observable<Hero[]> { return this._getAll(); }

  /** Update the entity in the database.  Update entities$. */
  update(entity: Hero): Observable<Hero> { return this._update(entity); }
}
