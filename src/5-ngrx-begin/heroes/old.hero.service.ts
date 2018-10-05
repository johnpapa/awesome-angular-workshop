import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Hero, ToastService } from '../core';
import {
  CqrsDataService,
  DataServiceConfig,
  HttpUrlGenerator
} from '../data-services';

@Injectable()
export class OldHeroService extends CqrsDataService<Hero> {
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
    return regEx
      ? entities.filter((e: any) => e.name && e.name.match(regEx))
      : entities;
  }
}
