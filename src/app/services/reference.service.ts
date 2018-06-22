import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http-utils";

export enum ApiType {
  daily = 'forecast/daily',
  weather = 'weather'
}

export enum MetricType {
  fahrenheit = 'imperial',
  celsius = 'metric'
}

export interface iAPIOpenWeatherParams {
  id?: string;
  cnt?: string;
  units?: string;
  q?: string;
  APPID?: string;
}

const DEF_PARAMS: iAPIOpenWeatherParams = {
  units: MetricType.celsius,
  APPID: 'bd5e378503939ddaee76f12ad7a97608'
};

@Injectable()
export class ReferenceService {

  private static API_URL = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient,
              private httpUtils: HttpUtils) {
  }

  public async get(apiType: ApiType, filter?: iAPIOpenWeatherParams): Promise<any> {
    const url = ReferenceService.API_URL + apiType;
    const params = this.httpUtils.searchParamsFrom(Object.assign(filter, DEF_PARAMS));

    const response = await this.http.get(url, {params, observe: 'response'})
      .toPromise()
      .catch(() => {
        throw new Error('Encountered server error');
      });

    return response.body;
  }
}