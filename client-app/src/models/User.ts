export class User {
  constructor(x?: Partial<User>) {
    this.firstName = x?.firstName ?? '';
    this.lastName = x?.lastName ?? '';
    this.picture = x?.picture ?? '';
    this.email = x?.email ?? '';
    this.post = x?.post ?? '';
    this.role = x?.role ?? '';
  }

  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  post: string;
  role: string;

  get fullName() {
    return `${this.lastName} ${this.firstName}`
  }
}

export type UserToken = User & { token: string };



