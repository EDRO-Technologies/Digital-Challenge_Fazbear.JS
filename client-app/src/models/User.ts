export class User {
  constructor(x?: Partial<User>) {
    this.firstName = x?.firstName ?? '';
    this.lastName = x?.lastName ?? '';
    this.picture = x?.picture ?? '';
    this.email = x?.email ?? '';
  }

  firstName: string;
  lastName: string;
  picture: string;
  email: string;

  get fullName() {
    return `${this.lastName} ${this.firstName}`
  }
}

