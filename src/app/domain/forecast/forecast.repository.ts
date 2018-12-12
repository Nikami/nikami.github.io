import {Injectable} from "@angular/core";
import {ApiType, IAPIOpenWeatherParams, OpenWeatherApiService} from "../../services/open-weather-api.service";
import {Forecast, ForecastJSON} from "./forecast";
import {StorageService} from "../../services/storage.service";

const FORECAST_PARAM = 'forecast';
const DEF_PARAMS: IAPIOpenWeatherParams = {
  q: 'london',
  cnt: '8'
};

@Injectable()
export class ForecastRepository {

  public static getFromStorage(): string {
    return StorageService.getFromStorage(FORECAST_PARAM);
  }

  public static setToStorage(forecast: ForecastJSON): void {
    return StorageService.setToStorage(FORECAST_PARAM, forecast);
  }

  constructor(private oWeatherApi: OpenWeatherApiService,
              private storageService: StorageService) {
  }

  async getLast(): Promise<Forecast> {
    const forecast = this.getCookieForecast() ?
      await Promise.resolve(JSON.parse(ForecastRepository.getFromStorage()))
      : await this.oWeatherApi.get(ApiType.forecast, DEF_PARAMS);

    if (!forecast) {
      throw new Error(`forecast is not in reference`);
    }

    this.setCookieForecast(forecast);
    ForecastRepository.setToStorage(forecast);

    return new Forecast(forecast);
  }

  async getByCityName(cityName: string): Promise<Forecast> {
    const forecast = await this.oWeatherApi.get(ApiType.forecast, Object.assign(DEF_PARAMS, {q: cityName}));

    if (!forecast) {
      return null;
    }

    this.setCookieForecast(forecast);
    ForecastRepository.setToStorage(forecast);

    return new Forecast(forecast);
  }

  getCookieForecast(): object {
    return this.storageService.getCookie(FORECAST_PARAM);
  }

  setCookieForecast(forecast: ForecastJSON): void {
    const date = new Date();
    date.setHours(date.getHours() + 2);
    this.storageService.setCookie(FORECAST_PARAM, forecast.city.id.toString(), date);
  }
}