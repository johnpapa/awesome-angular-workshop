import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hero } from '../core';
import { DataService, DataServiceConfig, HttpUrlGenerator } from '../data-services';
import { ToastService } from '../core';

@Injectable()
export class HeroesService extends DataService<Hero> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() toastService: ToastService,
    @Optional() config: DataServiceConfig
  ) {
    super('Hero', http, httpUrlGenerator, toastService, config);
  }
}
