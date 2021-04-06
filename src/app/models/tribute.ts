import { Installment } from './installment';

export const denominationDefault = 'TariTefa2021';

export class Tribute {
  idPrimaryCreditor = '';
  idSecondaryCreditor = '';
  ibanPrimary = '';
  ibanSecondary = '';
  percentageSecondary = 0;
  abilitaUnica = true;
  abilitaRate = true;
  dueDateUnique = '';
  installments: Array<Installment> = [];
  denomination = denominationDefault;

  constructor(
    idPrimaryCreditor: string,
    idSecondaryCreditor: string,
    ibanPrimary: string,
    ibanSecondary: string,
    percentageSecondary: number,
    abilitaUnica: boolean,
    abilitaRate: boolean,
    dueDateUnique: string,
    installments: Array<Installment>,
    denomination: string
  ) {
    this.idPrimaryCreditor = idPrimaryCreditor;
    this.idSecondaryCreditor = idSecondaryCreditor;
    this.ibanPrimary = ibanPrimary;
    this.ibanSecondary = ibanSecondary;
    this.percentageSecondary = percentageSecondary;
    this.abilitaUnica = abilitaUnica;
    this.abilitaRate = abilitaRate;
    this.dueDateUnique = dueDateUnique;
    this.installments = installments;
    this.denomination = denomination;
  }
}
