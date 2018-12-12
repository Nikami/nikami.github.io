import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Forecast} from "./forecast";
import {FORECAST_TEXT} from "./forecast.text";
import {ChartsForecastRepository, IChartForecast} from "../charts/charts-forecast.repository";
import {CurrentWeatherRepository} from "../current-weather/current-weather.repository";
import {ForecastRepository} from "./forecast.repository";

@Component({
  moduleId: module.id,
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent {

  public forecast: Forecast = this.route.snapshot.data['forecast'];
  public weather = this.route.snapshot.data['weather'];
  public text = FORECAST_TEXT;
  public tabs: ReadonlyArray<IChartForecast>;

  @ViewChild('searchInput') private searchInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private chartsForecastRepository: ChartsForecastRepository,
              private currentWeatherRepository: CurrentWeatherRepository,
              private forecast16Repository: ForecastRepository,
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