import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountryService } from 'src/app/core/country/country.service';
import { CountryModel } from 'src/app/shared/models/country/country.model';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent {
  isLoading = true;

  countries$!: BehaviorSubject<CountryModel[]>;

  constructor(
    private readonly _countryService: CountryService,
  ) {
  }

  ngOnInit(): void {
    this.countries$ = this._countryService.getCountries$();
    this._countryService
      .getAllCountries()
      .subscribe(() => (this.isLoading = false));
  }
}
