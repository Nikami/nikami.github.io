import {Routes} from "@angular/router";
import {Forecast16Component} from "./components/forecast16/forecast16.component";
import {Forecast16Resolver} from "./domain/forecast16/forecast16.resolver";
import {CurrentWeatherResolver} from "./domain/current-weather/current-weather.resolver";

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'forecast'
  },
  {
    path: 'forecast',
    component: Forecast16Component,
    resolve: {
      forecast16: Forecast16Resolver,
      weather: CurrentWeatherResolver
    }
  }
];
