import { PaymentMinimalModel } from './payment-minimal-model';

export class FindResponseModel {
  payments: Array<PaymentMinimalModel> = [];
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;
}
