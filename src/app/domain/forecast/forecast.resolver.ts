import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Forecast} from "./forecast";
import {ForecastRepository} from "./forecast.repository";

@Injectable()
export class ForecastResolver implements Resolve<Forecast> {

  constructor(private forecastRepository: ForecastRepository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Forecast> {
    return this.forecastRepository.getLast();
  }
}