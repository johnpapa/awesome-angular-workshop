import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './1-routing-guards-end/app.module';
import { AppDevModule } from './1-routing-guards-end/app-dev.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppDevModule);
// platformBrowserDynamic().bootstrapModule(AppModule);
