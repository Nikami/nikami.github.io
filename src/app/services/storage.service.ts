import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie";

@Injectable()
export class StorageService {

  constructor(private cookieService: CookieService) {
  }

  getFromStorage(param: string): string {
    return localStorage.getItem(param);
  }

  setToStorage(param: string, data: any): void {
    if (data instanceof Object) {
      localStorage.setItem(param, JSON.stringify(data));
    } else {
      localStorage.setItem(param, data.toString());
    }
  }

  getCookie(cookie: string): object {
    return this.cookieService.getObject(cookie);
  }

  setCookie(cookie: string, data: string, expireDate: Date) {
    this.cookieService.put(cookie, data, {expires: expireDate});
    this.setToStorage(cookie, data);
  }
}