import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '../core/module-import-check';

import { DataServiceConfig } from './data.service';
import { HttpUrlGenerator } from './http-url-generator';
import { Pluralizer, PLURAL_NAMES_TOKEN } from './pluralizer';

import { HeroesDataService } from './heroes-data.service';

export interface DataServicesModuleConfig {
  config?: DataServiceConfig;
  pluralNames?: { [name: string]: string };
}

@NgModule({
  providers: [
    HeroesDataService,
    HttpUrlGenerator,
    Pluralizer,
  ]
})
export class DataServicesModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: DataServicesModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'DataServicesModule');
  }

  static forRoot(config: DataServicesModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: DataServicesModule,
      providers: [
        { provide: DataServiceConfig, useValue: config.config },
        { provide: PLURAL_NAMES_TOKEN, multi: true, useValue: config.pluralNames }
      ]
    };
  }
}
