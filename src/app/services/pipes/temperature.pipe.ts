import { Pipe, PipeTransform } from '@angular/core';

export enum TemperatureUnit {
  K = 'K', // Kalvin
  C = 'C', // Celsius
  F = 'F' // Fahrenheit
}

export enum TemperatureUnitCode {
  K = 'K', // Kalvin
  C = '℃', // Celsius
  F = '℉' // Fahrenheit
}

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, input: TemperatureUnit, output?: TemperatureUnit, symbol?: boolean): any {
    if (isNaN(value) || !input) {
      return value.toString();
    }

    if (input === output || !output) {
      return value + (TemperatureUnitCode[input as keyof typeof TemperatureUnit] || '');
    }

    let convertedValue = 0;
    const converter = input + output;
    switch(converter) {
      case (TemperatureUnit.K + TemperatureUnit.C):
        convertedValue = +((value - 273.15).toFixed(0));
        return symbol ? convertedValue + TemperatureUnitCode.C : convertedValue;
      case (TemperatureUnit.C + TemperatureUnit.K):
        convertedValue = +((value + 273.15).toFixed(0));
        return symbol ? convertedValue + TemperatureUnitCode.K : convertedValue;
        // TODO write other converters...
      default:
        return value.toString();
    }

  }
}
