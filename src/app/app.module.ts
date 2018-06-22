import {isDevMode, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ReferenceService} from "./services/reference.service";
import {APP_ROUTES} from "./app.routes";
import {HttpUtils} from "./utils/http-utils";
import {Forecast16Component} from "./components/forecast16/forecast16.component";
import {Forecast16Resolver} from "./domain/forecast16/forecast16.resolver";
import {Forecast16Repository} from "./domain/forecast16/forecast-16.repository";
import {TemperaturePipe} from "./services/pipes/temperature.pipe";
import {DatePipe} from "@angular/common";
import {TabsComponent} from "./components/tabs/tabs.component";
import {TabComponent} from "./components/tabs/tab/tab.component";
import {TabContentDirective} from "./components/tabs/tab-content.directive";
import {ChartsForecastRepository} from "./domain/charts/charts-forecast.repository";
import { ChartModule } from "angular2-highcharts";
import * as highcharts from "highcharts";
import {HighchartsStatic} from "angular2-highcharts/docs/HighchartsService";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {CookieModule} from "ngx-cookie";
import {WeatherIconsService} from "./domain/weather-icons/weather-icons.service";
import {CurrentWeatherRepository} from "./domain/current-weather/current-weather.repository";
import {CurrentWeatherResolver} from "./domain/current-weather/current-weather.resolver";
import {StorageService} from "./services/storage.service";

// TODO Не самое лучшее решение, но красиво подружить highcharts с aot/rollap/systemjs весьма проблематично
export function highchartsFactory(): any {
  return isDevMode() ? highcharts : (<any>highcharts)['default'];
}

/**
 * ---------- APP MODULES DECLARATION -------------
 */
const ANGULAR_MODULES = [
  BrowserModule,
  HttpClientModule
];

const VENDOR_MODULES = [
  RouterModule.forRoot(APP_ROUTES, {enableTracing: false, useHash: true}),
  ChartModule,
  CookieModule.forRoot()
];

const ANGULAR_PROVIDERS = [
  DatePipe
];

const CUSTOM_PROVIDERS = [
  HttpUtils,
  ReferenceService,
  StorageService,
  Forecast16Resolver,
  Forecast16Repository,
  ChartsForecastRepository,
  TemperaturePipe,
  {provide: HighchartsStatic, useFactory: highchartsFactory},
  WeatherIconsService,
  CurrentWeatherRepository,
  CurrentWeatherResolver
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
    TabsComponent,
    TabComponent,
    TabContentDirective,
    // pipes
    TemperaturePipe
  ],
  providers: [
    ...ANGULAR_PROVIDERS,
    ...CUSTOM_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}