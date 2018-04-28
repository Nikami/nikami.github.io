import {Weather} from "../../interfaces/base.interface";
import {WeatherIconsService} from "../weather-icons/weather-icons.service";

export interface WeatherJSON {
  readonly id: number;
  readonly name: string;
  readonly cod: number;
  readonly coord: Coordinates;
  readonly weather: ReadonlyArray<Weather>;
  readonly base: string;
  readonly main: {
    readonly temp: number;
    readonly pressure: number;
    readonly humidity: number;
    readonly temp_min: number;
    readonly temp_max: number;
  };
  readonly wind: {
    readonly speed: number;
    readonly deg: number;
  };
  readonly clouds: {
    readonly all: number;
  };
  readonly rain: {
    readonly ['3h']: number;
  }
  readonly dt: number;
  readonly sys: {
    readonly type: string;
    readonly id: number;
    readonly message: string;
    readonly country: string;
    readonly sunrise: number;
    readonly sunset: number;
  }
}

export class CurrentWeather {
  private _id: number;
  private _code: number;
  private _coord: Coordinates;
  private _desc: string;
  private _date: Date;
  private _icon: string;
  private _temp: number;
  private _pressure: number;
  private _humidity: number;
  private _windSpeed: number;
  private _clouds: number;
  private _city: string;
  private _country: string;
  private _countryCode: number;

  constructor(weatherJSON: WeatherJSON,
              weatherIconsService: WeatherIconsService) {
    this._id = weatherJSON.id;
    this._code = weatherJSON.cod;
    this._coord = weatherJSON.coord;
    this._date = new Date(weatherJSON.dt * 1000);
    this._desc = weatherJSON.weather[0].description;
    this._icon = weatherIconsService.getIconByCode(weatherJSON.weather[0].id.toString());
    this._temp = weatherJSON.main.temp;
    this._pressure = weatherJSON.main.pressure;
    this._humidity = weatherJSON.main.humidity;
    this._windSpeed = weatherJSON.wind.speed;
    this._clouds = weatherJSON.clouds.all;
    this._city = weatherJSON.name;
    this._country = weatherJSON.sys.country;
    this._countryCode = weatherJSON.cod;
  }

  get desc(): string {
    return this._desc;
  }

  get icon(): string {
    return this._icon;
  }

  get temp(): string {
    return this._temp.toFixed(0);
  }

  get pressure(): number {
    return this._pressure;
  }

  get humidity(): number {
    return this._humidity;
  }

  get windSpeed(): string {
    return this._windSpeed + ' m/s';
  }

  get clouds(): string {
    return this._clouds + ' %';
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get countryCode(): number {
    return this._countryCode;
  }
}

