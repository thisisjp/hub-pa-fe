import { InstallmentDetailModel } from './installment-detail-model';

export class PaymentPositionDetailModel {
  id = 0;
  nominative?: string;
  fiscalCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  description?: string;
  status?: number;
  publishDate?: string;
  installments: Array<InstallmentDetailModel> = [];
}
