import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {IAPIOpenWeatherParams} from "../services/reference.service";

@Injectable()
export class HttpUtils {

  public searchParamsFrom(filter: IAPIOpenWeatherParams): HttpParams {
    const searchReducer = (params: HttpParams, key: any) => {
      return (filter.hasOwnProperty(key)) ? params.set(key, (<any>filter)[key]) : params;
    };
    return Object.keys(filter).reduce(searchReducer, new HttpParams());
  }
}