import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule, } from './core';
import { DataServiceConfig, DataServicesModule } from './data-services';

import { AppStoreModule } from './store/app-store.module';

import { AppComponent } from './app.component';

const dataServiceConfig: DataServiceConfig = {
  root: 'api',   // root path to web api
  timeout: 3000, // request timeout

  // Simulate latency for demo
  getDelay: 500,
  saveDelay: 800,
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DataServicesModule.forRoot({
      config: dataServiceConfig,
      pluralNames: { Hero: 'Heroes' }
    }),
    HttpClientModule,
    AppRoutingModule,

    // ngrx configured for the app
    AppStoreModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
