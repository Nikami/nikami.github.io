import {isDevMode, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {OpenWeatherApiService} from "./services/open-weather-api.service";
import {APP_ROUTES} from "./app.routes";
import {HttpUtils} from "./utils/http-utils";
import {ForecastComponent} from "./domain/forecast/forecast.component";
import {ForecastResolver} from "./domain/forecast/forecast.resolver";
import {ForecastRepository} from "./domain/forecast/forecast.repository";
import {TemperaturePipe} from "./services/pipes/temperature.pipe";
import {DatePipe} from "@angular/common";
import {ChartsForecastRepository} from "./domain/charts/charts-forecast.repository";
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import * as highcharts from "highcharts";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {CookieModule} from "ngx-cookie";
import {WeatherIconsService} from "./domain/weather-icons/weather-icons.service";
import {CurrentWeatherRepository} from "./domain/current-weather/current-weather.repository";
import {CurrentWeatherResolver} from "./domain/current-weather/current-weather.resolver";
import {StorageService} from "./services/storage.service";
import {SharedModule} from "./shared/shared.module";

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
  OpenWeatherApiService,
  StorageService,
  ForecastResolver,
  ForecastRepository,
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
    ...VENDOR_MODULES,
    SharedModule
  ],
  declarations: [
    // components
    AppComponent,
    ForecastComponent,
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