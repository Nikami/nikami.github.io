import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Forecast16} from "./forecast-16";
import {Forecast16Repository} from "./forecast-16.repository";

@Injectable()
export class Forecast16Resolver implements Resolve<Forecast16> {

  constructor(private forecast16repository: Forecast16Repository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Forecast16> {
    return this.forecast16repository.getLast();
  }
}