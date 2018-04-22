import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http-utils";

@Injectable()
export class ReferenceService {

  private static REFERENCE_URL = './api/';

  constructor(private http: HttpClient,
              private httpUtils: HttpUtils) {
  }

  public async get(ref: string, filter?: Record<string, string>): Promise<any> {
    const url = ReferenceService.REFERENCE_URL + ref;
    const params = this.httpUtils.searchParamsFrom(filter);

    const response = await this.http.get(url, {params, observe: 'response'})
      .toPromise()
      .catch(() => {
        throw new Error('Encountered server error');
      });

    return response.body;
  }
}