import {Injectable} from "@angular/core";
import {ReferenceService} from "../services/reference.service";
import {Forecast16} from "./forecast-16";

const CITY_REF = 'matoba.json';

@Injectable()
export class Forecast16Repository {

  constructor(private referenceService: ReferenceService) {
  }

  async get(): Promise<Forecast16> {
    const forecast = await this.referenceService.get(CITY_REF);

    if (!forecast) {
      throw new Error(`forecast is not in reference`);
    }

    return new Forecast16(forecast);
  }
}