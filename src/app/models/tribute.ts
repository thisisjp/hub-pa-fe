import { environment } from '../../environments/environment';
import { Installment } from './installment';
import { CreditorEntry } from './creditor-entry';

export class Tribute {
  ibanPrimary = '';
  ibanSecondary = '';
  percentageSecondary = 0;
  fiscalCodePrimaryCreditor = '';
  fiscalCodeSecondaryCreditor = '';
  postalIban = '';
  postalAccountholder = '';
  postalAuthCode = '';
  abilitaCcPostale = false;
  abilitaUnica = true;
  abilitaRate = true;
  dueDateUnique = '';
  installments: Array<Installment> = [];
  denomination = environment.denominationDefault;
  creditorList: Array<CreditorEntry> = [];

  constructor(
    ibanPrimary: string,
    ibanSecondary: string,
    percentageSecondary: number,
    fiscalCodePrimaryCreditor: string,
    fiscalCodeSecondaryCreditor: string,
    creditorList: Array<CreditorEntry>,
    postalIban: string,
    postalAccountholder: string,
    postalAuthCode: string,
    abilitaCcPostale: boolean,
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
    this.postalIban = postalIban;
    this.postalAccountholder = postalAccountholder;
    this.postalAuthCode = postalAuthCode;
    this.abilitaCcPostale = abilitaCcPostale;
    this.abilitaUnica = abilitaUnica;
    this.abilitaRate = abilitaRate;
    this.dueDateUnique = dueDateUnique;
    this.installments = installments;
    this.denomination = denomination;
  }
}
