export class AuthDto {
  userId!: string;
  personName!: string;
  email!: string;
  token!: string;
  expirationTime!: Date;

  constructor(
    userId: string,
    personName: string,
    email: string,
    token: string,
    expirationTime: Date
  ) {
    this.userId = userId;
    this.personName = personName;
    this.email = email;
    this.token = token;
    this.expirationTime = expirationTime;
  }
}
