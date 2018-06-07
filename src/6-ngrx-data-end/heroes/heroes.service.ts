// ngrx-data version
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceFactory
} from 'ngrx-data';

import { Hero, ToastService } from '../core';
import { FilterObserver } from '../shared/filter';

@Injectable({ providedIn: 'root' })
export class HeroesService extends EntityCollectionServiceBase<Hero> {
  filterObserver: FilterObserver;

  constructor(
    entityServiceFactory: EntityCollectionServiceFactory,
    private toastService: ToastService
  ) {
    super('Hero', entityServiceFactory);

    /** User's filter pattern */
    this.filterObserver = {
      filter$: this.filter$,
      setFilter: this.setFilter.bind(this)
    };
  }
}
