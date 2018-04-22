import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Forecast16} from "../domain/forecast-16";

@Component({
  moduleId: module.id,
  selector: 'forecast-16',
  templateUrl: './forecast16.component.html'
})
export class Forecast16Component {

  constructor(private route: ActivatedRoute) {
    console.log('forecast=', this.forecast);
  }

  private forecast: ReadonlyArray<Forecast16> = this.route.snapshot.data['forecast16'];
}