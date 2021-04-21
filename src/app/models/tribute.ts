import { Installment } from './installment';
import { CreditorEntry } from './creditor-entry';

export const denominationDefault = 'TariTefa2021';

export class Tribute {
  ibanPrimary = '';
  ibanSecondary = '';
  percentageSecondary = 0;
  fiscalCodePrimaryCreditor = '';
  fiscalCodeSecondaryCreditor = '';
  abilitaUnica = true;
  abilitaRate = true;
  dueDateUnique = '';
  installments: Array<Installment> = [];
  denomination = denominationDefault;
  creditorList: Array<CreditorEntry> = [];

  constructor(
    ibanPrimary: string,
    ibanSecondary: string,
    percentageSecondary: number,
    fiscalCodePrimaryCreditor: string,
    fiscalCodeSecondaryCreditor: string,
    creditorList: Array<CreditorEntry>,
    abilitaUnica: boolean,
    abilitaRate: boolean,
    dueDateUnique: string,
    installments: Array<Installment>,
    denomination: string
  ) {
    this.ibanPrimary = ibanPrimary;
    this.ibanSecondary = ibanSecondary;
    this.percentageSecondary = percentageSecondary;
    this.fiscalCodePrimaryCreditor = fiscalCodePrimaryCreditor;
    this.fiscalCodeSecondaryCreditor = fiscalCodeSecondaryCreditor;
    this.creditorList = creditorList;
    this.abilitaUnica = abilitaUnica;
    this.abilitaRate = abilitaRate;
    this.dueDateUnique = dueDateUnique;
    this.installments = installments;
    this.denomination = denomination;
  }
}
