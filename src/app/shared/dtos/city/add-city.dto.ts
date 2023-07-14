export class AddCityDto {
  [key: string]: string | number | Blob | undefined;

  name!: string;
  lat!: number;
  lon!: number;
  countryName!: string;
  cityImage!: Blob;

  constructor(
    name: string,
    lat: number,
    lon: number,
    countryName: string,
    cityImage: Blob,
  ) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.countryName = countryName;
    this.cityImage = cityImage;
  }
}