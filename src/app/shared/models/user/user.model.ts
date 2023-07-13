export class UserModel {
  userId!: string;
  personName!: string;
  email!: string;

  constructor(
    userId: string,
    personName: string,
    email: string,
  ) {
    this.userId = userId;
    this.personName = personName;
    this.email = email;
  }
}
