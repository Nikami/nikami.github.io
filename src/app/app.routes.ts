import {Routes} from "@angular/router";
import {Forecast16Component} from "./components/forecast16/forecast16.component";
import {Forecast16Resolver} from "./resolvers/forecast16.resolver";

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'src/forecast'
  },
  {
    path: 'src/forecast',
    component: Forecast16Component,
    resolve: {
      forecast16: Forecast16Resolver
    }
  }
];
