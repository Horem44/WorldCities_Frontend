export class RegisterDto {
  personName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    this.personName = userName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
