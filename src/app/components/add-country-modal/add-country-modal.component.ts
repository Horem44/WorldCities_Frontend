import { Component, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { CountryService } from 'src/app/core/country/country.service';
import { CountryModel } from 'src/app/shared/models/country/country.model';

@Component({
  selector: 'app-add-country-modal',
  templateUrl: './add-country-modal.component.html',
  styleUrls: ['./add-country-modal.component.scss'],
})
export class AddCountryModalComponent {
  submit$ = new Subject<void>();

  constructor(private readonly _countryService: CountryService) {}

  form: FormGroup = new FormGroup({
    countryName: new FormControl<string>('', [Validators.required]),
    iso2: new FormControl<string>('', [Validators.required]),
    iso3: new FormControl<string>('', [Validators.required]),
  });

  submit() {
    const { countryName, iso2, iso3 } = this.form.value;
    const country = new CountryModel(countryName, iso2, iso3);

    this._countryService.addCountry(country).subscribe(console.log);
  }

  ngOnInit(): void {
    this.submit$.pipe(take(1)).subscribe(this.submit);
  }
}
