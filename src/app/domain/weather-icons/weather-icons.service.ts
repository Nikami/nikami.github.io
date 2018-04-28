import {Injectable} from "@angular/core";
import {WEATHER_ICONS} from "./weather-icons";

@Injectable()
export class WeatherIconsService {

  public getIconByCode(code: string): string {
    const prefix = 'wi wi-';
    let icon = WEATHER_ICONS[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(+code > 699 && +code < 800) && !(+code > 899 && +code < 1000)) {
      icon = 'day-' + icon;
    }

    return (prefix + icon);
  }
}