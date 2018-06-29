import {Injectable} from "@angular/core";
import {ApiType, IAPIOpenWeatherParams, ReferenceService} from "../../services/reference.service";
import {Forecast16, Forecast16JSON} from "./forecast-16";
import {StorageService} from "../../services/storage.service";

const FORECAST_PARAM = 'forecast16';
const DEF_PARAMS: IAPIOpenWeatherParams = {
  q: 'london',
  cnt: '5'
};

@Injectable()
export class Forecast16Repository {

  public static getFromStorage(): string {
    return StorageService.getFromStorage(FORECAST_PARAM);
  }

  public static setToStorage(forecast: Forecast16JSON): void {
    return StorageService.setToStorage(FORECAST_PARAM, forecast);
  }

  constructor(private referenceService: ReferenceService,
              private storageService: StorageService) {
  }

  async getLast(): Promise<Forecast16> {
    const forecast = this.getCookieForecast() ?
      await Promise.resolve(JSON.parse(Forecast16Repository.getFromStorage()))
      : await this.referenceService.get(ApiType.forecast, DEF_PARAMS);

    if (!forecast) {
      throw new Error(`forecast is not in reference`);
    }

    this.setCookieForecast(forecast);
    Forecast16Repository.setToStorage(forecast);

    return new Forecast16(forecast);
  }

  async getByCityName(cityName: string): Promise<Forecast16> {
    const forecast = await this.referenceService.get(ApiType.forecast, {q: cityName, cnt: '5'});

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