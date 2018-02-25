import { NgModule } from '@angular/core';

// Ngrx Packages
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Our eagerly loaded store features
import { EntityStoreModule } from './entity-store.module';

import { environment } from '../../environments/environment';

/**
 * Ngrx configured for the application
 */
@NgModule({
  imports: [
    // Setup ngrx root
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    // Add eagerly-loaded ngrx feature modules
    EntityStoreModule,

    // Don't load the developer tools in production
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {}
