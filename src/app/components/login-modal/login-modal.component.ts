import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginDto } from 'src/app/shared/dtos/auth/login.dto';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  submit$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly _authService: AuthService){}

  submit() {
    const { email, password } = this.form.value;

    const loginDto = new LoginDto(email, password);
    this._authService.login(loginDto).subscribe(console.log);
  }

  ngOnInit(): void {
    this.submit$.pipe(take(1)).subscribe(() => this.submit());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
