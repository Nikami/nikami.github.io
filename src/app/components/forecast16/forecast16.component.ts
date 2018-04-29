import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Forecast16} from "../../domain/forecast16/forecast-16";
import {FORECAST_16_TEXT} from "./forecast16.text";
import {ChartsForecastRepository, IChartForecast} from "../../domain/charts/charts-forecast.repository";
import {CurrentWeatherRepository} from "../../domain/current-weather/current-weather.repository";
import {Forecast16Repository} from "../../domain/forecast16/forecast-16.repository";

@Component({
  moduleId: module.id,
  selector: 'forecast-16',
  templateUrl: './forecast16.component.html',
  styleUrls: ['./forecast16.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Forecast16Component {

  public forecast: Forecast16 = this.route.snapshot.data['forecast16'];
  public weather = this.route.snapshot.data['weather'];
  public text = FORECAST_16_TEXT;
  public tabs: ReadonlyArray<IChartForecast>;

  @ViewChild('searchInput') private searchInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private chartsForecastRepository: ChartsForecastRepository,
              private currentWeatherRepository: CurrentWeatherRepository,
              private forecast16Repository: Forecast16Repository,
              private cdRef: ChangeDetectorRef) {
    this.tabs = this.chartsForecastRepository.getAll(this.forecast);
  }

  async searchByCityName(text: string) {
    const searchText = text.toLowerCase().trim();

    if (searchText) {
      this.weather = await this.currentWeatherRepository.getByCityName(searchText);
      const forecast = await this.forecast16Repository.getByCityName(searchText);
      this.tabs = this.chartsForecastRepository.getAll(forecast);
      this.searchInput.nativeElement.value = '';
      this.cdRef.detectChanges();
    }
  }
}