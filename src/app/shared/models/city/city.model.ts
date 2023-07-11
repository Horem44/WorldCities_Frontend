export class CityModel {
  guid!: string;
  name!: string;
  lat!: number;
  lon!: number;
  countryGuid!: string;

  constructor(
    guid: string,
    name: string,
    lat: number,
    lon: number,
    countryGuid: string
  ) {
    this.guid = guid;
    this.name = name;
    this.lat = lat;
    this.lon = lon;

    this.countryGuid = countryGuid;
  }
}
