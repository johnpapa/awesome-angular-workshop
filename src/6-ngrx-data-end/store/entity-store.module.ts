import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig, NgrxDataModule } from 'ngrx-data';
import {
  defaultDataServiceConfig,
  entityMetadata,
  pluralNames
} from './entity-metadata';

@NgModule({
  imports: [
    NgrxDataModule.forRoot({
      entityMetadata: entityMetadata,
      pluralNames: pluralNames
    })
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class EntityStoreModule {}
