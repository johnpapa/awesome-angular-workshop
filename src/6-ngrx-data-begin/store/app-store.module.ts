import { NgModule } from '@angular/core';

// Ngrx Packages
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Our eagerly loaded store features
import { EntityStoreModule } from './entity-store.module';

// ToastService that listens to the ngrx-data EntityActions
import { NgrxDataToastService } from './ngrx-data-toast.service';

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
  ],
  providers: [ NgrxDataToastService ]
})
export class AppStoreModule {
  // Inject NgrxDataToastService to start it listening
  constructor( toastService: NgrxDataToastService) { }
}
