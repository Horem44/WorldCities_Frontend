import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-country-modal',
  templateUrl: './add-country-modal.component.html',
  styleUrls: ['./add-country-modal.component.scss'],
})
export class AddCountryModalComponent {
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    countryName: new FormControl(''),
    iso2: new FormControl(''),
    iso3: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
}
