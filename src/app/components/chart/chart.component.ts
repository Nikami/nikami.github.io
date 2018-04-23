import {Component, Input, OnInit} from "@angular/core";
import {Chart} from 'angular-highcharts';
import { AxisOptions, IndividualSeriesOptions, Options } from 'highcharts';

export interface IChartOptions {
  readonly title: string;
  readonly series: IndividualSeriesOptions[];
  readonly xAxis: AxisOptions[];
}

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

@Component({
  moduleId: module.id,
  selector: 'chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {

  @Input() series: IndividualSeriesOptions[];
  @Input() xAxis: AxisOptions[];

  chart: Chart;

  ngOnInit(): void {
    const chart = new ChartCreator(this.series, this.xAxis);
    this.chart = new Chart(chart);
  }
}