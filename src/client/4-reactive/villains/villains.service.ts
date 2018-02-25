import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Villain } from '../core';
import { DataService, DataServiceConfig, HttpUrlGenerator } from '../data-services';
import { ToastService } from '../core';

@Injectable()
export class VillainsService extends DataService<Villain> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() toastService: ToastService,
    @Optional() config: DataServiceConfig
  ) {
    super('Villain', http, httpUrlGenerator, toastService, config);
  }

  protected filterProjector(filterValue: string, entities: Villain[]) {
    const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
    return regEx ?
      entities.filter((e: any) =>
        (e.name && e.name.match(regEx)) ||
        (e.saying && e.saying.match(regEx))
      ) :
      entities;
  }
}
