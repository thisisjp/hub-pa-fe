export class PaymentMinimalModel {
  id?: number;
  fiscalCode?: string;
  name?: string;
  surname?: string;
  date?: Date;
  status?: number;
  isDuplicated = false;
  checked = false;
}
