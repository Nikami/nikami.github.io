import {Injectable} from "@angular/core";
import {ApiType, iAPIOpenWeatherParams, ReferenceService} from "../../services/reference.service";
import {Forecast16, Forecast16JSON} from "./forecast-16";
import {StorageService} from "../../services/storage.service";
import {CurrentWeather} from "../current-weather/current-weather";
import {CurrentWeatherRepository} from "../current-weather/current-weather.repository";

const FORECAST_PARAM = 'forecast16';
const DEF_PARAMS: iAPIOpenWeatherParams = {
  id: '5367815',
  cnt: '16'
};

@Injectable()
export class Forecast16Repository {

  constructor(private referenceService: ReferenceService,
              private storageService: StorageService) {
  }

  public static getFromStorage(): string {
    return StorageService.getFromStorage(FORECAST_PARAM);
  }

  public static setToStorage(forecast: Forecast16JSON): void {
    return StorageService.setToStorage(FORECAST_PARAM, forecast);
  }

  async getLast(): Promise<Forecast16> {
    const forecast = this.getCookieForecast() ?
      await Promise.resolve(JSON.parse(Forecast16Repository.getFromStorage()))
      : await this.referenceService.get(ApiType.daily, DEF_PARAMS);

    if (!forecast) {
      throw new Error(`forecast is not in reference`);
    }

    this.setCookieForecast(forecast);
    Forecast16Repository.setToStorage(forecast);

    return new Forecast16(forecast);
  }

  async getByCityName(cityName: string): Promise<Forecast16> {
    const forecast = await this.referenceService.get(ApiType.daily, {q: cityName, cnt: '16'});

    if (!forecast) {
      return null;
    }

    this.setCookieForecast(forecast);
    Forecast16Repository.setToStorage(forecast);

    return new Forecast16(forecast);
  }

  getCookieForecast(): object {
    return this.storageService.getCookie(FORECAST_PARAM);
  }

  setCookieForecast(forecast: Forecast16JSON): void {
    const date = new Date();
    date.setHours(date.getHours() + 2);
    this.storageService.setCookie(FORECAST_PARAM, forecast.city.id.toString(), date);
  }
}