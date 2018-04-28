import {Injectable} from "@angular/core";
import {ApiType, iAPIOpenWeatherParams, ReferenceService} from "../../services/reference.service";
import {WeatherIconsService} from "../weather-icons/weather-icons.service";
import {StorageService} from "../../services/storage.service";
import {CurrentWeather, WeatherJSON} from "./current-weather";

const DEF_PARAMS: iAPIOpenWeatherParams = {
  id: '5367815'
};

@Injectable()
export class CurrentWeatherRepository {

  constructor(private referenceService: ReferenceService,
              private storageService: StorageService,
              private weatherIconsService: WeatherIconsService) {
  }

  public static getFromStorage(): string {
    return StorageService.getFromStorage(ApiType.weather);
  }

  public static setToStorage(weather: WeatherJSON): void {
    return StorageService.setToStorage(ApiType.weather, weather);
  }

  async getLast(): Promise<CurrentWeather> {
    const weather = this.getCookieWeather() ?
      await Promise.resolve(JSON.parse(CurrentWeatherRepository.getFromStorage()))
      : await this.referenceService.get(ApiType.weather, DEF_PARAMS);

    if (!weather) {
      throw new Error(`forecast is not in reference`);
    }

    this.setCookieWeather(weather);
    CurrentWeatherRepository.setToStorage(weather);

    return new CurrentWeather(weather, this.weatherIconsService);
  }

  getCookieWeather(): object {
    return this.storageService.getCookie(ApiType.weather);
  }

  setCookieWeather(weather: WeatherJSON): void {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 20);
    this.storageService.setCookie(ApiType.weather, weather.id.toString(), date);
  }
}