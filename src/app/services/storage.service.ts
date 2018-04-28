import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie";

@Injectable()
export class StorageService {

  constructor(private cookieService: CookieService) {
  }

  public static getFromStorage(param: string): string {
    return localStorage.getItem(param);
  }

  public static setToStorage(param: string, data: any): void {
    if (data instanceof Object) {
      localStorage.setItem(param, JSON.stringify(data));
    } else {
      localStorage.setItem(param, data.toString());
    }
  }

  public getCookie(cookie: string): object {
    return this.cookieService.getObject(cookie);
  }

  public setCookie(cookie: string, data: string, expireDate: Date): void {
    this.cookieService.put(cookie, data, {expires: expireDate});
    StorageService.setToStorage(cookie, data);
  }
}