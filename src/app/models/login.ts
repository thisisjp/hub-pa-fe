export class Login {
  username = '';
  password = '';
  recaptcha = '';

  constructor(username: string, password: string, recaptcha: string) {
    this.username = username;
    this.password = password;
    this.recaptcha = recaptcha;
  }
}
