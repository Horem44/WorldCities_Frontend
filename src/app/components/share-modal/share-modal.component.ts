import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { UserModel } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent {
  submit$ = new Subject<void>();
  users$!: Observable<UserModel[]>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly _userService: UserService) {}

  form: FormGroup = new FormGroup({
    personName: new FormControl<string>('', [Validators.required]),
  });

  submit() {
    const { userName } = this.form.value;
    console.log(userName);
  }

  chooseUserInfo(userInfo: UserModel) {
    this.form.patchValue({
      personName: userInfo.personName,
    });
  }

  ngOnInit(): void {
    this.users$ = this._userService.getUsers$();
    
    this.submit$.pipe(take(1)).subscribe(() => this.submit());

    this.users$ = this.form.get('personName')!.valueChanges.pipe(
      takeUntil(this.destroy$),
      switchMap((personName: string) =>
        this._userService.debounceFilterUsers(personName)
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
