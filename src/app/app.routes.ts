import {Routes} from "@angular/router";
import {ForecastComponent} from "./domain/forecast/forecast.component";
import {ForecastResolver} from "./domain/forecast/forecast.resolver";
import {CurrentWeatherResolver} from "./domain/current-weather/current-weather.resolver";

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'forecast'
  },
  {
    path: 'forecast',
    component: ForecastComponent,
    resolve: {
      forecast: ForecastResolver,
      weather: CurrentWeatherResolver
    }
  }
];
