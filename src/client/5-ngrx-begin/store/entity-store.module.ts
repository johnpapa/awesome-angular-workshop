// Store Module for all Entities
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ENTITY_CACHE_NAME, reducers } from './reducers';
import { effects } from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature(ENTITY_CACHE_NAME, reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class EntityStoreModule { }
