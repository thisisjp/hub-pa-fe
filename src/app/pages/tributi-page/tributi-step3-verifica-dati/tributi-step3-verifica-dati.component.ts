import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { CreditorEntry } from '../../../models/creditor-entry';
import { TributeService } from '../../../services/tribute.service';
import { AvvisiStep } from '../../../models/avvisi-step';
import { Notifica } from '../../../models/notifica';

@Component({
  selector: 'app-tributi-step3',
  templateUrl: './tributi-step3-verifica-dati.component.html',
  styleUrls: ['./tributi-step3-verifica-dati.component.sass']
})
export class TributiStep3VerificaDatiComponent implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;
  private avvisiStepEnum = AvvisiStep;
  compiledForm = new Tribute('', '', '', '', 0, '', '', [], true, true, '', [], '');
  primaryCreditor = new CreditorEntry();
  secondaryCreditor = new CreditorEntry();

  constructor(private router: Router, private tributeService: TributeService) {}

  ngOnInit(): void {
    // eslint-disable-next-line functional/immutable-data
    this.compiledForm = new Tribute(
      history.state?.data?.idPrimaryCreditor,
      history.state?.data?.idSecondaryCreditor,
      history.state?.data?.ibanPrimary,
      history.state?.data?.ibanSecondary,
      history.state?.data?.percentageSecondary,
      history.state?.data?.fiscalCodePrimaryCreditor,
      history.state?.data?.fiscalCodeSecondaryCreditor,
      history.state?.data?.creditorList,
      history.state?.data?.abilitaUnica,
      history.state?.data?.abilitaRate,
      history.state?.data?.abilitaUnica ? history.state?.data?.dueDateUnique : '',
      history.state?.data?.abilitaRate ? history.state?.data?.installments : [],
      denominationDefault
    );

    // eslint-disable-next-line functional/immutable-data
    this.primaryCreditor = this.compiledForm.creditorList?.filter(
      elem => elem.id === this.compiledForm.idPrimaryCreditor
    )[0];
    // eslint-disable-next-line functional/immutable-data
    this.secondaryCreditor = this.compiledForm.creditorList?.filter(
      elem => elem.id === this.compiledForm.idSecondaryCreditor
    )[0];
  }

  nextStep(): void {
    // console.log('submit', this.compiledForm);
    if (this.tributeService.saveService(this.compiledForm)) {
      const data = new Notifica(
        'Configurazione completata',
        'Il tributo è stato configurato con successo. Adesso puoi caricare le posizioni debitorie.'
      );
      this.router
        .navigate([this.menuEnum.HOME_PATH + '/' + this.avvisiStepEnum.STEP0], {
          state: { data }
        })
        .catch(reason => reason);
    }
  }

  prevStep(): void {
    const data = this.compiledForm;
    this.router
      .navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP2], {
        state: { data }
      })
      .catch(reason => reason);
  }

  getFormattedDate(inputDate: string): string {
    const inputParts = inputDate.split('-');
    return inputParts[2] + '/' + inputParts[1] + '/' + inputParts[0];
  }
}
