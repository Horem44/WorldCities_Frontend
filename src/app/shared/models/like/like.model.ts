export class LikeModel {
  userGuid!: string;
  cityGuid!: string;

  constructor(userGuid: string, cityGuid: string) {
    this.cityGuid = cityGuid;
    this.userGuid = userGuid;
  }
}
