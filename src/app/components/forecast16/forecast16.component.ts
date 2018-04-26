import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Forecast16} from "../../domain/forecast-16";
import {FORECAST_16_TEXT} from "./forecast16.text";
import {ChartsForecastRepository, IChartForecast} from "../../services/charts-forecast.repository";

@Component({
  moduleId: module.id,
  selector: 'forecast-16',
  templateUrl: './forecast16.component.html'
})
export class Forecast16Component {

  public forecast: Forecast16 = this.route.snapshot.data['forecast16'];
  public text = FORECAST_16_TEXT;
  public tabs: IChartForecast[];
  public icon: string;

  constructor(private route: ActivatedRoute,
              private chartsForecastRepository: ChartsForecastRepository) {
    this.tabs = this.chartsForecastRepository.getAll(this.forecast);
  }

  setIcon(): void {
    const prefix = 'wi wi-';
    const code = this.forecast.weather[0].id;
    const icon = weatherIcons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }

    // Finally tack on the prefix.
    icon = prefix + icon;
  }
}