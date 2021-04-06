import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { denominationDefault, Tribute } from '../../../models/tribute';

@Component({
  selector: 'app-tributi-step3',
  templateUrl: './tributi-step3.component.html',
  styleUrls: ['./tributi-step3.component.sass']
})
export class TributiStep3Component implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;
  private compiledForm = new Tribute('', '', '', '', 0, true, true, '', [], '');

  constructor(private router: Router) {}

  ngOnInit(): void {
    // eslint-disable-next-line functional/immutable-data
    this.compiledForm = new Tribute(
      history.state?.data?.idPrimaryCreditor,
      history.state?.data?.idSecondaryCreditor,
      history.state?.data?.ibanPrimary,
      history.state?.data?.ibanSecondary,
      history.state?.data?.percentageSecondary,
      history.state?.data?.abilitaUnica,
      history.state?.data?.abilitaRate,
      history.state?.data?.dueDateUnique,
      history.state?.data?.installments,
      denominationDefault
    );
  }

  nextStep(): void {
    // TODO submit
    // void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP3]);
  }

  prevStep(): void {
    const data = this.compiledForm;
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP2], {
      state: { data }
    });
  }
}
