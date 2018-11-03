// ngrx-data version
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { Hero } from '../core';
import { FilterObserver } from '../shared/filter';

@Injectable({ providedIn: 'root' })
export class HeroService extends EntityCollectionServiceBase<Hero> {
  /** User's filter pattern */
  filterObserver: FilterObserver = {
    filter$: this.filter$,
    setFilter: this.setFilter.bind(this)
  };
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Hero', serviceElementsFactory);
  }
}
