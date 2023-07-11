import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { CityService } from 'src/app/core/city/city.service';
import { CityModel } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrls: ['./add-city-modal.component.scss'],
})
export class AddCityModalComponent implements OnInit {
  submit$ = new Subject<void>();

  constructor(private readonly _cityService: CityService) {}

  form: FormGroup = new FormGroup({
    cityName: new FormControl<string>('', [Validators.required]),
    latitude: new FormControl<number>(0, [Validators.required]),
    longtitude: new FormControl<number>(0, [Validators.required]),
    country: new FormControl<string>('', [Validators.required]),
  });

  submit() {
    const {cityName, latitude, longtitude, country} = this.form.value;
    const city = new CityModel(cityName, latitude, longtitude, country);

    this._cityService.addCity(city).subscribe(console.log);
  }

  ngOnInit(): void {
    this.submit$.pipe(take(1)).subscribe(this.submit);
  }
}
