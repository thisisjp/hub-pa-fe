import { Installment } from './installment';
import { CreditorEntry } from './creditor-entry';

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
  creditorList: Array<CreditorEntry> = [];

  constructor(
    idPrimaryCreditor: string,
    idSecondaryCreditor: string,
    ibanPrimary: string,
    ibanSecondary: string,
    percentageSecondary: number,
    creditorList: Array<CreditorEntry>,
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
    this.creditorList = creditorList;
    this.abilitaUnica = abilitaUnica;
    this.abilitaRate = abilitaRate;
    this.dueDateUnique = dueDateUnique;
    this.installments = installments;
    this.denomination = denomination;
  }
}
