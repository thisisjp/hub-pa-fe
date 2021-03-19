export class Message {
  code = '';
  typeMessage = '';

  constructor(code: string, typeMessage: string) {
    this.code = code;
    this.typeMessage = typeMessage;
  }
}
