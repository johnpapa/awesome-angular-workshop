import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CqrsDataService, DataServiceConfig, HttpUrlGenerator } from '../data-services';
import { Villain, ToastService } from '../core';

@Injectable()
export class VillainsService extends CqrsDataService<Villain> {
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
