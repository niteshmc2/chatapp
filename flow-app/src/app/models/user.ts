export class User {
  email: String;
  username: String;
  password: String;
  role: String;

  constructor(username: String, email: String, password: String, role: String) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
