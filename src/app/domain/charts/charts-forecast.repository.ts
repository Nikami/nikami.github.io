import {Injectable} from "@angular/core";
import {AxisOptions, CreditsOptions, IndividualSeriesOptions, LegendOptions, Options} from "highcharts";
import {TemperaturePipe} from "../../services/pipes/temperature.pipe";
import {DatePipe} from "@angular/common";
import {FORECAST_TEXT} from "../forecast/forecast.text";
import {Forecast} from "../forecast/forecast";

export interface IChartForecast {
  name: string;
  chart: ChartCreator;
}

const BLUE_HEX = '#a4daf6';
const PINK_HEX = '#f6daeb';
const RED_HEX = '#f66358';
const DARK_BLUE_HEX = '#5377ff';
const COLS_WIDTH = 100;

export class ChartCreator implements Options {
  chart = {
    type: 'column'
  };

  title = {
    text: ''
  };

  credits: CreditsOptions = {
    enabled: false
  };

  legend: LegendOptions = {
    enabled: false
  };

  yAxis: AxisOptions = {
    visible: false
  };

  series: IndividualSeriesOptions[];
  xAxis: AxisOptions;

  constructor(series: IndividualSeriesOptions[],
              xAxis: AxisOptions) {
    this.series = series || [];
    this.xAxis = xAxis;
  }
}

@Injectable()
export class ChartsForecastRepository {

  constructor(private tempPipe: TemperaturePipe,
              private datePipe: DatePipe) {
  }

  public getAll(forecast: Forecast): IChartForecast[] {
    const daysAxis = forecast.days.map((day) => {
      return this.datePipe.transform(new Date(day.dt * 1000), 'd MMM, h:mm a');
    });

    const WIND_CHART: IChartForecast = {
      name: FORECAST_TEXT.TABS.WIND,
      chart: new ChartCreator([{
          name: FORECAST_TEXT.TABS.WIND,
          data: forecast.days.map((day) => day.wind.speed),
          color: BLUE_HEX,
          pointWidth: COLS_WIDTH
        }],
        {
          categories: daysAxis
        })
    };

    const TEMPERATURE_CHART: IChartForecast = {
      name: FORECAST_TEXT.TABS.TEMPERATURE,
      chart: new ChartCreator(
        [{
          name: FORECAST_TEXT.TABS.TEMPERATURE,
          data: forecast.days.map((day) => +day.main.temp.toFixed(0)),
          color: PINK_HEX,
          pointWidth: COLS_WIDTH
        }],
        {
          categories: daysAxis
        })
    };

    const PRESSURE_CHART: IChartForecast = {
      name: FORECAST_TEXT.TABS.PRESSURE,
      chart: new ChartCreator([{
          name: FORECAST_TEXT.TABS.PRESSURE,
          data: forecast.days.map((day) => day.main.pressure),
          color: RED_HEX,
          pointWidth: COLS_WIDTH
        }],
        {
          categories: daysAxis
        })
    };

    const HUMIDITY_CHART: IChartForecast = {
      name: FORECAST_TEXT.TABS.HUMIDITY,
      chart: new ChartCreator([{
          name: FORECAST_TEXT.TABS.HUMIDITY,
          data: forecast.days.map((day) => day.main.humidity),
          color: DARK_BLUE_HEX,
          pointWidth: COLS_WIDTH
        }],
        {
          categories: daysAxis
        })
    };

    return [WIND_CHART, TEMPERATURE_CHART, PRESSURE_CHART, HUMIDITY_CHART];
  }
}