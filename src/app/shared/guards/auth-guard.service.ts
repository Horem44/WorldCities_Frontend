import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  token: string | null;

  constructor(private readonly _authService: AuthService) {
    this.token = _authService.getJwtToken()
    this.canActivate(this.token);
  }

  canActivate(value: unknown): boolean {
    if (!value) {
      window.location.replace(window.location.origin + '/login');
      return false;
    }

    return true;
  }
}
