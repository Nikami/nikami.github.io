import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class HttpUtils {

  public searchParamsFrom(filter: Record<string, string> = {}): HttpParams {
    const searchReducer = (params: HttpParams, key: string) => {
      return (filter.hasOwnProperty(key)) ? params.set(key, filter[key]) : params;
    };

    return Object.keys(filter).reduce(searchReducer, new HttpParams());
  }
}