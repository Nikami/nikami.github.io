export interface Coordinates {
  readonly lon: number;
  readonly lat: number;
}

export interface Weather {
  readonly id: number;
  readonly main: string;
  readonly description: string;
  readonly icon: string;
}