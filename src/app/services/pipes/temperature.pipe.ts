import { Pipe, PipeTransform } from '@angular/core';

enum TemperatureUnit {
  K = 'K', // Kalvin
  C = 'C', // Celsius
  F = 'F' // Fahrenheit
}

enum TemperatureUnitCode {
  K = 'K', // Kalvin
  C = '℃', // Celsius
  F = '℉' // Fahrenheit
}

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, input: TemperatureUnit, output: TemperatureUnit): string {
    if (isNaN(value) || !input) {
      return value.toString();
    }

    if (input === output || !output) {
      return value + (TemperatureUnitCode[input as keyof typeof TemperatureUnit] || '');
    }

    const converter = input + output;
    switch(converter) {
      case (TemperatureUnit.K + TemperatureUnit.C):
        return (value - 273.15).toFixed(0) + TemperatureUnitCode.C;
      case (TemperatureUnit.C + TemperatureUnit.K):
        return (value + 273.15).toFixed(0) + TemperatureUnitCode.K;
        // TODO write other converters...
      default:
        return value.toString();
    }

  }
}
