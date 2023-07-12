import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { CityService } from 'src/app/core/city/city.service';
import { FindCityService } from 'src/app/core/find-city/find-city.service';
import { IFindCity } from 'src/app/core/find-city/interfaces/find-city.interface';
import { AddCityDto } from 'src/app/shared/dtos/city-dtos/add-city.dto';
import { CityModel } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrls: ['./add-city-modal.component.scss'],
})
export class AddCityModalComponent implements OnInit, OnDestroy {
  submit$ = new Subject<void>();
  cityInfo$!: Observable<IFindCity[]>;

  private readonly destroy$ = new Subject<void>();
  private cityImage!: Blob;

  constructor(
    private readonly _cityService: CityService,
    private readonly _findCityService: FindCityService
  ) {}

  form: FormGroup = new FormGroup({
    cityName: new FormControl<string>('', [Validators.required]),
    latitude: new FormControl<number | null>(null, [Validators.required]),
    longtitude: new FormControl<number | null>(null, [Validators.required]),
    country: new FormControl<string>('', [Validators.required]),
    cityImage: new FormControl(null, [Validators.required]),
  });

  submit() {
    const { cityName, latitude, longtitude, country } = this.form.value;

    const addCityDto = new AddCityDto(
      cityName,
      latitude,
      longtitude,
      country,
      this.cityImage
    );

    this._cityService.addCity(addCityDto).subscribe();
  }

  chooseCityInfo(cityInfo: IFindCity) {
    this.form.patchValue({
      cityName: cityInfo.name,
      latitude: cityInfo.latitude,
      longtitude: cityInfo.longitude,
      country: cityInfo.country,
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];

    this.cityImage = file;
  }

  ngOnInit(): void {
    this.submit$.pipe(take(1)).subscribe(() => this.submit());

    this.cityInfo$ = this.form.get('cityName')!.valueChanges.pipe(
      takeUntil(this.destroy$),
      switchMap((value: string) =>
        this._findCityService.debounceFindCity(value)
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
