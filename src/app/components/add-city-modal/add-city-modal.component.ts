import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrls: ['./add-city-modal.component.scss'],
})
export class AddCityModalComponent {
  @Output() submitEM = new EventEmitter();

  closeLoginModal$ = new Subject<void>();

  form: FormGroup = new FormGroup({
    cityName: new FormControl(''),
    latitude: new FormControl(''),
    longtitude: new FormControl(''),
    country: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  closeLoginModal() {
    this.closeLoginModal$.next();
  }
}
