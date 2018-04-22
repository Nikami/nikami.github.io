import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReferenceService} from "./services/reference.service";
import {APP_ROUTES} from "./app.routes";
import {HttpUtils} from "./utils/http-utils";
import {Forecast16Component} from "./components/forecast16.component";
import {Forecast16Resolver} from "./resolvers/forecast16.resolver";
import {Forecast16Repository} from "./domain/forecast-16.repository";

/**
 * ---------- APP MODULES DECLARATION -------------
 */
const ANGULAR_MODULES = [
  BrowserModule,
  HttpClientModule
];

const VENDOR_MODULES = [
  RouterModule.forRoot(APP_ROUTES, {enableTracing: false, useHash: true}),
];

@NgModule({
  imports: [
    ...ANGULAR_MODULES,
    ...VENDOR_MODULES
  ],
  declarations: [
    AppComponent,
    Forecast16Component
  ],
  providers: [
    HttpUtils,
    ReferenceService,
    Forecast16Repository,
    Forecast16Resolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
