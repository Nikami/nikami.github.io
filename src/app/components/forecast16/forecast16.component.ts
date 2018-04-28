import {Component, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Forecast16} from "../../domain/forecast16/forecast-16";
import {FORECAST_16_TEXT} from "./forecast16.text";
import {ChartsForecastRepository, IChartForecast} from "../../domain/charts/charts-forecast.repository";

@Component({
  moduleId: module.id,
  selector: 'forecast-16',
  templateUrl: './forecast16.component.html',
  styleUrls: ['./forecast16.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Forecast16Component {

  public forecast: Forecast16 = this.route.snapshot.data['forecast16'];
  public weather = this.route.snapshot.data['weather'];
  public text = FORECAST_16_TEXT;
  public tabs: ReadonlyArray<IChartForecast>;

  constructor(private route: ActivatedRoute,
              private chartsForecastRepository: ChartsForecastRepository) {
    this.tabs = this.chartsForecastRepository.getAll(this.forecast);
  }
}