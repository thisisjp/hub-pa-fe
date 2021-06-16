import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/enums/menu.enum';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { CreditorEntry } from '../../../models/creditor-entry';
import { Notifica } from '../../../models/notifica';
import { ServiceManagementService } from '../../../services/service-management.service';

@Component({
  selector: 'app-tributi-step3',
  templateUrl: './tributi-step3-verifica-dati.component.html',
  styleUrls: ['./tributi-step3-verifica-dati.component.sass']
})
export class TributiStep3VerificaDatiComponent implements OnInit {
  private menuEnum = Menu;
  compiledForm = new Tribute('', '', 0, '', '', [], '', '', '', false, true, true, '', [], '');
  primaryCreditor = new CreditorEntry();
  secondaryCreditor = new CreditorEntry();

  constructor(private router: Router, private serviceManagementService: ServiceManagementService) {}

  ngOnInit(): void {
    // eslint-disable-next-line functional/immutable-data
    this.compiledForm = new Tribute(
      history.state?.data?.ibanPrimary,
      history.state?.data?.ibanSecondary,
      history.state?.data?.percentageSecondary,
      history.state?.data?.fiscalCodePrimaryCreditor,
      history.state?.data?.fiscalCodeSecondaryCreditor,
      history.state?.data?.creditorList,
      history.state?.data?.postalIban,
      history.state?.data?.postalAccountholder,
      history.state?.data?.postalAuthCode,
      history.state?.data?.abilitaCcPostale,
      history.state?.data?.abilitaUnica,
      history.state?.data?.abilitaRate,
      history.state?.data?.abilitaUnica ? history.state?.data?.dueDateUnique : '',
      history.state?.data?.abilitaRate ? history.state?.data?.installments : [],
      denominationDefault
    );

    // eslint-disable-next-line functional/immutable-data
    this.primaryCreditor = this.compiledForm.creditorList?.filter(
      elem => elem.codiceFiscale === this.compiledForm.fiscalCodePrimaryCreditor
    )[0];
    // eslint-disable-next-line functional/immutable-data
    this.secondaryCreditor = this.compiledForm.creditorList?.filter(
      elem => elem.codiceFiscale === this.compiledForm.fiscalCodeSecondaryCreditor
    )[0];
  }

  nextStep(): void {
    this.serviceManagementService.saveService(this.compiledForm).subscribe(res => {
      if (res && res.result) {
        const data = new Notifica(
          'Configurazione completata',
          'Il tributo è stato configurato con successo. Adesso puoi caricare le posizioni debitorie.'
        );
        this.router
          .navigate([this.menuEnum.HOME_PATH + '/' + this.menuEnum.AVVISI_STEP0], {
            state: { data }
          })
          .catch(reason => reason);
      }
    });
  }

  prevStep(): void {
    const data = this.compiledForm;
    this.router
      .navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP2], {
        state: { data }
      })
      .catch(reason => reason);
  }

  getFormattedDate(inputDate: string): string {
    const inputParts = inputDate.split('-');
    return inputParts[2] + '/' + inputParts[1] + '/' + inputParts[0];
  }

  isPostalRowVisible(): boolean {
    return !!(
      this.compiledForm.postalAccountholder &&
      this.compiledForm.postalIban &&
      this.compiledForm.postalAuthCode
    );
  }
}
