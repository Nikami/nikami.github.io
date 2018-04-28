import {Coordinates, Weather} from "../../interfaces/base.interface";

interface Temperature {
  readonly day: number;
  readonly min: number;
  readonly max: number;
  readonly night: number;
  readonly eve: number;
  readonly morn: number;
}

interface City {
  readonly id: number;
  readonly name: string;
  readonly country: string;
  readonly coord: Coordinates
}

interface DayForecast {
  readonly dt: number;
  readonly temp: Temperature;
  readonly pressure: number;
  readonly humidity: number;
  readonly weather: ReadonlyArray<Weather>;
  readonly speed: number;
  readonly deg: number;
  readonly clouds: number;
  readonly rain: number;
  readonly uvi: number
}

export interface Forecast16JSON {
  readonly city: City;
  readonly list: ReadonlyArray<DayForecast>;
}

export class Forecast16 {
  private _days: ReadonlyArray<DayForecast>;

  constructor(forecast: Forecast16JSON) {
    this._days = forecast.list;
  }

  get days(): ReadonlyArray<DayForecast> {
    return this._days;
  }
}