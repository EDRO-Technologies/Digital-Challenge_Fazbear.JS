export class SocialUser {
  constructor(x: Partial<SocialUser>) {
    this.email = x.email ?? '';
    this.firstName = x.firstName ?? '';
    this.lastName = x.lastName ?? '';
    this.picture = x.picture ?? '';
  }

  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}