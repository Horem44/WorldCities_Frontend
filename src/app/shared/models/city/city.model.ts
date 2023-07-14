export class CityModel {
  [key: string]: string | number | Blob;

  guid!: string;
  name!: string;
  lat!: number;
  lon!: number;
  countryName!: string;
  cityImageGuid!: string;
  likesCount!: number;

  constructor(
    name: string,
    lat: number,
    lon: number,
    countryName: string,
    cityImageGuid: string,
    likesCount: number,
  ) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.countryName = countryName;
    this.cityImageGuid = cityImageGuid;
    this.likesCount = likesCount;
  }
}
