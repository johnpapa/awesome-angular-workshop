import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './4-reactive/app.module';
import { AppDevModule } from './4-reactive/app-dev.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppDevModule);
// platformBrowserDynamic().bootstrapModule(AppModule);
