import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { LocalStorageService as LocalStorageService } from '../localstorage/localstorage.service';
import { LoginDto } from 'src/app/shared/dtos/auth/login.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthDto } from 'src/app/shared/dtos/auth/auth.dto';
import { environment } from 'src/enviroments/enviroment';
import { RegisterDto } from 'src/app/shared/dtos/auth/register.dto';
import { UserService } from '../user/user.service';
import { UserModel } from 'src/app/shared/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _baseService: BaseService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _userService: UserService
  ) {}

  login(loginDto: LoginDto): Observable<AuthDto> {
    return this._baseService
      .post<AuthDto>(`${environment.serverBaseUrl}/account/login`, loginDto)
      .pipe(
        take(1),
        tap((dto) => this.setCredentials(dto))
      );
  }

  register(registerDto: RegisterDto): Observable<AuthDto> {
    return this._baseService
      .post<AuthDto>(
        `${environment.serverBaseUrl}/account/register`,
        registerDto
      )
      .pipe(
        take(1),
        tap((dto) => this.setCredentials(dto))
      );
  }

  logout(): Observable<void> {
    return this._baseService
      .get<void>(`${environment.serverBaseUrl}/account/logout`)
      .pipe(
        take(1),
        tap(() => this.removeCredentials())
      );
  }

  authorize(): Observable<AuthDto>{
    return this._baseService
      .get<AuthDto>(`${environment.serverBaseUrl}/account/authorize`)
      .pipe(
        take(1),
        tap((dto) => this.setCredentials(dto))
      );
  }

  getJwtToken(){
    return this._localStorageService.getItem("token");
  }

  private removeCredentials(){
    this.setUser(null);
    this.removeJwtToken();

    this.login$.next(false);
  }

  private setCredentials(authDto: AuthDto) {
    const user = new UserModel(
      authDto.userId,
      authDto.personName,
      authDto.email
    );

    this.setJwtToken(authDto.token);
    console.log(user);
    this.setUser(user);

    this.login$.next(true);
  }

  private setJwtToken(token: string) {
    this._localStorageService.setItem('token', token);
  }

  private removeJwtToken() {
    this._localStorageService.removeItem('token');
  }

  private setUser(user: UserModel | null) {
    this._userService.currentUser = user;
  }
}
