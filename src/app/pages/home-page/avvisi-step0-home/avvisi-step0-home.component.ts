import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { AvvisiStep } from '../../../models/avvisi-step';

@Component({
  selector: 'app-avvisi-step0',
  templateUrl: './avvisi-step0-home.component.html',
  styleUrls: ['./avvisi-step0-home.component.sass']
})
export class AvvisiStep0HomeComponent {
  private menuEnum = Menu;
  private avvisiStepEnum = AvvisiStep;

  constructor(private router: Router) {}

  nextStep(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.avvisiStepEnum.STEP1]).catch(reason => reason);
  }
}
