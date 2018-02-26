// ngrx-data version
import { Injectable } from '@angular/core';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';

import { Hero, ToastService } from '../core';
import { FilterObserver } from '../shared/filter';

@Injectable()
export class HeroesService extends EntityServiceBase<Hero> {

  filterObserver: FilterObserver;

  constructor(
    entityServiceFactory: EntityServiceFactory,
    private toastService: ToastService) {
    super('Hero', entityServiceFactory);

    /** User's filter pattern */
    this.filterObserver = {
      filter$: this.filter$,
      setFilter: this.setFilter.bind(this)
    };
  }
}
