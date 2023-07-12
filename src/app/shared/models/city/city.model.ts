export class CityModel {
  [key: string]: string | number | Blob | undefined;

  guid!: string;
  name!: string;
  lat!: number;
  lon!: number;
  countryName!: string;
  cityImageGuid?: string | undefined;

  constructor(
    name: string,
    lat: number,
    lon: number,
    countryName: string,
    cityImage: Blob,
    cityImageGuid?: string,
  ) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.countryName = countryName;
    this.cityImageGuid = cityImageGuid;
  }
}
