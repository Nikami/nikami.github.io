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

  constructor(private route: ActivatedRoute,
              private chartsForecastRepository: ChartsForecastRepository) {
    this.tabs = this.chartsForecastRepository.getAll(this.forecast);
  }
}