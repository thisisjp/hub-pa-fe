import { InstallmentDetailModel } from './installment-detail-model';

export class PaymentPositionDetailModel {
  nominative?: string;
  fiscalCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  description?: string;
  status?: number;
  installments: Array<InstallmentDetailModel> = [];
}
