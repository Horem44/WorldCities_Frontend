import { CityModel } from "../city/city.model";

export class CountryModel {
  guid!: string;
  name!: string;
  iso2!: string;
  iso3!: string;
  cities?: Array<CityModel> | null;

  constructor(
    name: string,
    iso2: string,
    iso3: string,
    cities?: Array<CityModel>
  ) {
    this.name = name;
    this.iso2 = iso2;
    this.iso3 = iso3;

    this.cities = cities || null;
  }
}