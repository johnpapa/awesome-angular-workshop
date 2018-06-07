import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CqrsDataService, DataServiceConfig, HttpUrlGenerator } from '../data-services';
import { Hero, ToastService } from '../core';

@Injectable()
export class OldHeroesService extends CqrsDataService<Hero> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() toastService: ToastService,
    @Optional() config: DataServiceConfig
  ) {
    super('Hero', http, httpUrlGenerator, toastService, config);
  }

  protected filterProjector(filterValue: string, entities: Hero[]) {
    const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
    return regEx ?
      entities.filter((e: any) => e.name && e.name.match(regEx)) :
      entities;
  }
}
