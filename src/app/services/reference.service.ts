import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http-utils";
import {CookieService} from "ngx-cookie";
import {Forecast16JSON} from "../domain/forecast-16";

@Injectable()
export class ReferenceService {

  private static REFERENCE_URL = './api/';

  constructor(private http: HttpClient,
              private httpUtils: HttpUtils,
              private cookieService: CookieService) {
  }

  public async get(ref: string, filter?: Record<string, string>): Promise<any> {
    const url = ReferenceService.REFERENCE_URL + ref;
    const params = this.httpUtils.searchParamsFrom(filter);

    if (this.getForecast()) {
      return Promise.resolve(JSON.parse(this.getForecastFromStorage()));
    }

    const response = await this.http.get(url, {params, observe: 'response'})
      .toPromise()
      .catch(() => {
        throw new Error('Encountered server error');
      });

    this.setForecast(response.body);

    return response.body;
  }

  // TODO переписать в отдельный сервис кеширование погоды
  getForecast() {
    return this.cookieService.getObject('forecast16');
  }

  setForecast(forecast: Forecast16JSON | any) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 20);
    this.cookieService.put('forecast16', forecast.city.id, {expires: date});
    this.setForecastToStorage('forecast16', forecast);
  }

  getForecastFromStorage(): string {
    return localStorage.getItem('forecast16');
  }

  setForecastToStorage(param: string, forecast: Forecast16JSON) {
    localStorage.setItem(param, JSON.stringify(forecast));
  }
}