
export class UserResponse {
  constructor(x: Partial<UserResponse>) {
    this.id = x.id ?? 0;
    this.email = x.email ?? '';
    this.firstName = x.firstName ?? '';
    this.lastName = x.lastName ?? '';
    this.picture = x.picture ?? ''
  }

  id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}