import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';

@Component({
  selector: 'app-tributi-step3',
  templateUrl: './tributi-step3.component.html',
  styleUrls: ['./tributi-step3.component.sass']
})
export class TributiStep3Component {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;

  constructor(private router: Router) {}

  nextStep(): void {
    // TODO submit
    // void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP3]);
  }

  prevStep(): void {
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP2]);
  }
}
