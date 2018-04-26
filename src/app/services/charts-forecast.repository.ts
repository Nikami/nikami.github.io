import {Injectable} from "@angular/core";
import {AxisOptions, IndividualSeriesOptions, Options} from "highcharts";
import {TemperaturePipe, TemperatureUnit} from "./pipes/temperature.pipe";
import {DatePipe} from "@angular/common";
import {Forecast16} from "../domain/forecast-16";
import {FORECAST_16_TEXT} from "../components/forecast16/forecast16.text";

export interface IChartForecast {
  name: string;
  chart: ChartCreator;
}

const BLUE_HEX = '#a4daf6';
const PINK_HEX = '#f6daeb';
const RED_HEX = '#f66358';
const DARK_BLUE_HEX = '#5377ff';
const COLS_WIDTH = 60;

export class ChartCreator implements Options {
  chart = {
    type: 'column'
  };

  title = {
    text: ''
  };

  credits = {
    enabled: false
  };

  series: IndividualSeriesOptions[];
  xAxis: AxisOptions[];
  colorAxis: [{
    lineColor: '#ffffff',
    gridLineColor: '#ffffff',
    minorGridLineColor: '#ffffff',
  }];

  constructor(series: IndividualSeriesOptions[],
              xAxis: AxisOptions[]) {
    this.series = series || [];
    this.xAxis = xAxis;
  }
}

@Injectable()
export class ChartsForecastRepository {

  constructor(private tempPipe: TemperaturePipe,
              private datePipe: DatePipe) {
  }

  public getAll(forecast: Forecast16): IChartForecast[] {
    const daysAxis = forecast.days.map((day) => {
      return this.datePipe.transform(new Date(day.dt * 1000), 'MMM d');
    });

    const WIND_CHART: IChartForecast = {
      name: FORECAST_16_TEXT.TABS.WIND,
      chart: new ChartCreator([{
          name: FORECAST_16_TEXT.TABS.WIND,
          data: forecast.days.map((day) => day.speed),
          color: BLUE_HEX,
          pointWidth: COLS_WIDTH
        }],
        [{
          categories: daysAxis
        }])
    };

    const TEMPERATURE_CHART: IChartForecast = {
      name: FORECAST_16_TEXT.TABS.TEMPERATURE,
      chart: new ChartCreator(
        [{
          name: FORECAST_16_TEXT.TABS.TEMPERATURE,
          data: forecast.days.map((day) => {
            const average = +(((day.temp.max + day.temp.min) / 2).toFixed(0));
            return this.tempPipe.transform(average, TemperatureUnit.K, TemperatureUnit.C);
          }),
          color: PINK_HEX,
          pointWidth: COLS_WIDTH
        }],
        [{
          categories: daysAxis
        }])
    };

    const PRESSURE_CHART: IChartForecast = {
      name: FORECAST_16_TEXT.TABS.PRESSURE,
      chart: new ChartCreator([{
          name: FORECAST_16_TEXT.TABS.PRESSURE,
          data: forecast.days.map((day) => day.pressure),
          color: RED_HEX,
          pointWidth: COLS_WIDTH
        }],
        [{
          categories: daysAxis
        }])
    };

    const HUMIDITY_CHART: IChartForecast = {
      name: FORECAST_16_TEXT.TABS.HUMIDITY,
      chart: new ChartCreator([{
          name: FORECAST_16_TEXT.TABS.HUMIDITY,
          data: forecast.days.map((day) => day.humidity),
          color: DARK_BLUE_HEX,
          pointWidth: COLS_WIDTH
        }],
        [{
          categories: daysAxis
        }])
    };

    return [WIND_CHART, TEMPERATURE_CHART, PRESSURE_CHART, HUMIDITY_CHART];
  }
}