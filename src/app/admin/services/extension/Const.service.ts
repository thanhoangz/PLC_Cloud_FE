

export class ConstService {
  public static user;
  public static permissions;
  constructor() { }

  public getUser() {
    return ConstService.user;
  }

  public setUser(x) {
    ConstService.user = x;
  }
}
