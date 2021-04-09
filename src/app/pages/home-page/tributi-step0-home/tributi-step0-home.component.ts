import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';

@Component({
  selector: 'app-tributi-step0',
  templateUrl: './tributi-step0-home.component.html',
  styleUrls: ['./tributi-step0-home.component.sass']
})
export class TributiStep0HomeComponent {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;

  constructor(private router: Router) {}

  nextStep(): void {
    this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP1]).catch(reason => reason);
  }
}
