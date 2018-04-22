interface Temperature {
  readonly day: number,
  readonly min: number,
  readonly max: number,
  readonly night: number,
  readonly eve: number,
  readonly morn: number
}

interface Weather {
  readonly id: number,
  readonly main: string,
  readonly description: string,
  readonly icon: string
}

interface City {
  readonly id: number;
  readonly name: string,
  readonly country: string,
  readonly coord: { 
    readonly lon: number,
    readonly lat: number
  }
}

interface DayForecast {
  readonly dt: number,
  readonly temp: Temperature,
  readonly pressure: number,
  readonly humidity: number,
  readonly weather: ReadonlyArray<Weather>,
  readonly speed: number,
  readonly deg: number,
  readonly clouds: number,
  readonly rain: number,
  readonly uvi: number
}

export interface Forecast16JSON {
  readonly city: City;
  readonly time: number;
  readonly data: ReadonlyArray<DayForecast>;
}

export class Forecast16 {
  private _city: City;
  private _time: Date;
  private _days: ReadonlyArray<DayForecast>;

  constructor(forecast: Forecast16JSON) {
    this._city = forecast.city;
    this._time = new Date(forecast.time);
    this._days = forecast.data;
  }

  get city(): City {
    return this._city;
  }

  get time(): Date {
    return this._time;
  }

  get days(): ReadonlyArray<DayForecast> {
    return this._days;
  }
}