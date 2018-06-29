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
  readonly main: {
    readonly temp: number;
    readonly temp_min: number;
    readonly temp_max: number;
    readonly pressure: number;
    readonly sea_level: number;
    readonly grnd_level: number;
    readonly humidity: number;
    readonly temp_kf: number;
  };
  readonly weather: ReadonlyArray<Weather>;
  readonly clouds: {
    readonly all: number;
  };
  readonly wind: {
    readonly speed: number;
    readonly deg: number;
  },
  readonly sys: {
    readonly pod: string;
  },
  readonly dt_txt: string;
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