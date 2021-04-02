import { Installment } from './installment';

export class Tribute {
  idPrimaryCreditor = '';
  idSecondaryCreditor = '';
  ibanPrimary = '';
  ibanSecondary = '';
  percentageSecondary = 0;
  dueDateUnique = '';
  installments: Array<Installment> = [];
  denomination = 'TariTefa2021';

  constructor(
    idPrimaryCreditor: string,
    idSecondaryCreditor: string,
    ibanPrimary: string,
    ibanSecondary: string,
    percentageSecondary: number,
    dueDateUnique: string,
    installments: Array<Installment>,
    denomination: string
  ) {
    this.idPrimaryCreditor = idPrimaryCreditor;
    this.idSecondaryCreditor = idSecondaryCreditor;
    this.ibanPrimary = ibanPrimary;
    this.ibanSecondary = ibanSecondary;
    this.percentageSecondary = percentageSecondary;
    this.dueDateUnique = dueDateUnique;
    this.installments = installments;
    this.denomination = denomination;
  }
}
