import { PaymentMinimalModel } from './payment-minimal-model';

export class FindResponseModel {
  payments: Array<PaymentMinimalModel> = [];
  totalItems = 0;
  totalPages = 0;
}
