// ngrx-data version
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceFactory
} from 'ngrx-data';

import { Hero } from '../core';
import { FilterObserver } from '../shared/filter';

@Injectable({ providedIn: 'root' }) // :-)
export class HeroesService extends EntityCollectionServiceBase<Hero> {
  /** User's filter pattern */
  filterObserver: FilterObserver = {
    filter$: this.filter$,
    setFilter: this.setFilter.bind(this)
  };
  constructor(factory: EntityCollectionServiceFactory) {
    super('Hero', factory);
  }
}
