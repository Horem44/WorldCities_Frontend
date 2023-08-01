export class AddCityDto {
  [key: string]: string | number | Blob | undefined;

  name!: string;
  lat!: number;
  lon!: number;
  countryId!: string;
  cityImage!: Blob;

  constructor(
    name: string,
    lat: number,
    lon: number,
    countryId: string,
    cityImage: Blob
  ) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.countryId = countryId;
    this.cityImage = cityImage;
  }
}
