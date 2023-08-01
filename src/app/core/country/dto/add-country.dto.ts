export class AddCountryDto {
  countryName: string;

  constructor(name: string) {
    this.countryName = name;
  }
}
