export class CountryModel {
  guid!: string;
  name!: string;
  citiesCount!: number;

  constructor(name: string, citiesCount: number) {
    this.name = name;
    this.citiesCount = citiesCount;
  }
}
