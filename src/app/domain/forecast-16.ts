interface Temperature {
  readonly day: number;
  readonly min: number;
  readonly max: number;
  readonly night: number;
  readonly eve: number;
  readonly morn: number;
}

interface Weather {
  readonly id: number;
  readonly main: string;
  readonly description: string;
  readonly icon: string;
}

interface City {
  readonly id: number;
  readonly name: string;
  readonly country: string;
  readonly coord: { 
    readonly lon: number;
    readonly lat: number;
  }
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
  readonly time: number;
  readonly data: ReadonlyArray<DayForecast>;
}

export class Forecast16 {
  private _city: City;
  private _date: Date;
  private _days: ReadonlyArray<DayForecast>;
  private _firstDay: DayForecast;

  constructor(forecast: Forecast16JSON) {
    this._city = forecast.city;
    this._date = new Date(forecast.time * 1000);
    this._days = forecast.data;
    this._firstDay = this._days[0];
  }

  get countryCode(): string {
    return this._city.country;
  }

  get cityName(): string {
    return this._city.name;
  }

  get date(): Date {
    return this._date;
  }

  get days(): ReadonlyArray<DayForecast> {
    return this._days;
  }

  get currentTemp(): number {
    const hours = this._date.getHours();

    if (hours > 6 && hours < 12) {
      return this._firstDay.temp.morn;
    } else if (hours > 12 && hours < 18) {
      return this._firstDay.temp.day;
    } else if (hours > 18 && hours < 24) {
      return this._firstDay.temp.eve;
    } else {
      return this._firstDay.temp.night;
    }
  }

  get firstDayPressure(): string {
    return this._firstDay.pressure.toString();
  }

  get firstDayHumidity(): string {
    return this._firstDay.humidity.toString();
  }

  get firstDayWindSpeed(): string {
    return this._firstDay.speed + ' m/s';
  }

  get firstDayClouds(): string {
    return this._firstDay.clouds + ' %';
  }

  get weatherMainDesc(): string {
    return this._firstDay.weather[0].main;
  }
}