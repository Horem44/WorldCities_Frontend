import { Component, Input } from '@angular/core';
import { CountryModel } from '../../models/country/country.model';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss']
})
export class CountryItemComponent {
  @Input() country!: CountryModel;
}
