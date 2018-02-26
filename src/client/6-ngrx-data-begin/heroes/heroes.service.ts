// Clean Ngrx version
import { Injectable } from '@angular/core';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest, finalize, take, tap } from 'rxjs/operators';

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
