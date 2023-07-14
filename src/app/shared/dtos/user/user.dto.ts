export class UserDto {
  guid!: string;
  personName!: string;

  constructor(guid: string, personName: string) {
    this.guid = guid;
    this.personName = personName;
  }
}
