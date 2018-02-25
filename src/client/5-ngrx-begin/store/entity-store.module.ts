// Store Module for all Entities
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ENTITY_CACHE_NAME, reducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(ENTITY_CACHE_NAME, reducers)
  ]

})
export class EntityStoreModule { }
