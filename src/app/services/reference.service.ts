import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http-utils";

export enum ApiType {
  forecast = 'forecast',
  daily = 'forecast/daily',
  weather = 'weather'
}

export enum MetricType {
  fahrenheit = 'imperial',
  celsius = 'metric'
}

export interface IAPIOpenWeatherParams {
  id?: string;
  cnt?: string;
  units?: string;
  q?: string;
  APPID?: string;
}

const DEF_PARAMS: IAPIOpenWeatherParams = {
  units: MetricType.celsius,
  APPID: 'b4fdac594bf85ff05aeeab8cd87cd159'
};

@Injectable()
export class ReferenceService {

  private static API_URL = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient,
              private httpUtils: HttpUtils) {
  }

  public async get(apiType: ApiType, filter?: IAPIOpenWeatherParams): Promise<any> {
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