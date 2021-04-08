import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { AvvisiStep } from '../../../models/avvisi-step';

@Component({
  selector: 'app-avvisi-step0',
  templateUrl: './avvisi-step0.component.html',
  styleUrls: ['./avvisi-step0.component.sass']
})
export class AvvisiStep0Component {
  private menuEnum = Menu;
  private avvisiStepEnum = AvvisiStep;

  constructor(private router: Router) {}

  nextStep(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.avvisiStepEnum.STEP1]).catch(reason => reason);
  }
}
