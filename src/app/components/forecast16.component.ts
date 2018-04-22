import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Forecast16} from "../domain/forecast-16";
import {FORECAST_16_TEXT} from "./forecast16.text";

@Component({
  moduleId: module.id,
  selector: 'forecast-16',
  templateUrl: './forecast16.component.html'
})
export class Forecast16Component {

  constructor(private route: ActivatedRoute) {
    console.log('forecast=', this.forecast);
  }

  public forecast: Forecast16 = this.route.snapshot.data['forecast16'];
  public text = FORECAST_16_TEXT;

}