export class CityModel {
  guid!: string;
  name!: string;
  lat!: number;
  lon!: number;
  countryName!: string;

  constructor(
    name: string,
    lat: number,
    lon: number,
    countryName: string
  ) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.countryName = countryName;
  }
}
