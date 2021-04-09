import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { CreditorEntry } from '../../../models/creditor-entry';

@Component({
  selector: 'app-tributi-step3',
  templateUrl: './tributi-step3-verifica-dati.component.html',
  styleUrls: ['./tributi-step3-verifica-dati.component.sass']
})
export class TributiStep3VerificaDatiComponent implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;
  compiledForm = new Tribute('', '', '', '', 0, [], true, true, '', [], '');
  primaryCreditor = new CreditorEntry();
  secondaryCreditor = new CreditorEntry();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // eslint-disable-next-line functional/immutable-data
    this.compiledForm = new Tribute(
      history.state?.data?.idPrimaryCreditor,
      history.state?.data?.idSecondaryCreditor,
      history.state?.data?.ibanPrimary,
      history.state?.data?.ibanSecondary,
      history.state?.data?.percentageSecondary,
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
    // TODO submit
    // console.log('submit', this.compiledForm);
    // this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP3]).catch(reason => reason);
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
