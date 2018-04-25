import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReferenceService} from "./services/reference.service";
import {APP_ROUTES} from "./app.routes";
import {HttpUtils} from "./utils/http-utils";
import {Forecast16Component} from "./components/forecast16/forecast16.component";
import {Forecast16Resolver} from "./resolvers/forecast16.resolver";
import {Forecast16Repository} from "./domain/forecast-16.repository";
import {TemperaturePipe} from "./services/pipes/temperature.pipe";
import {ChartModule} from "angular-highcharts";
import {ChartComponent} from './components/chart/chart.component';
import {DatePipe} from '@angular/common';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabComponent} from './components/tabs/tab/tab.component';
import {TabContentDirective} from './components/tabs/tab-content.directive';
import {ChartsForecastRepository} from "./services/charts-forecast.repository";

/**
 * ---------- APP MODULES DECLARATION -------------
 */
const ANGULAR_MODULES = [
  BrowserModule,
  HttpClientModule
];

const VENDOR_MODULES = [
  RouterModule.forRoot(APP_ROUTES, {enableTracing: false, useHash: true}),
  ChartModule
];

@NgModule({
  imports: [
    ...ANGULAR_MODULES,
    ...VENDOR_MODULES
  ],
  declarations: [
    // components
    AppComponent,
    Forecast16Component,
    ChartComponent,
    TabsComponent,
    TabComponent,
    TabContentDirective,
    // pipes
    TemperaturePipe
  ],
  providers: [
    // utils
    HttpUtils,
    // services
    ReferenceService,
    Forecast16Repository,
    Forecast16Resolver,
    DatePipe,
    TemperaturePipe,
    ChartsForecastRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}