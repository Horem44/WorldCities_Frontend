import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RegisterDto } from 'src/app/shared/dtos/auth/register.dto';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  submit$ = new Subject<void>();
  close$ = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private readonly _authService: AuthService) {}

  submit() {
    const { email, name, password, confirmPassword } = this.form.value;
    const registerDto = new RegisterDto(name, email, password, confirmPassword);

    this._authService.register(registerDto).subscribe(console.log);
  }

  ngOnInit(): void {
    this.submit$.pipe(take(1)).subscribe(() => this.submit());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
