import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';

@Component({
  selector: 'app-tributi-step0',
  templateUrl: './tributi-step0-home.component.html',
  styleUrls: ['./tributi-step0-home.component.sass']
})
export class TributiStep0HomeComponent {
  private menuEnum = Menu;

  constructor(private router: Router) {}

  nextStep(): void {
    this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP1]).catch(reason => reason);
  }
}
