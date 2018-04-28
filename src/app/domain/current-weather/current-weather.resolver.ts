import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CurrentWeather} from "./current-weather";
import {CurrentWeatherRepository} from "./current-weather.repository";

@Injectable()
export class CurrentWeatherResolver implements Resolve<CurrentWeather> {

  constructor(private currentWeatherRepository: CurrentWeatherRepository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CurrentWeather> {
    return this.currentWeatherRepository.getCurrent();
  }
}