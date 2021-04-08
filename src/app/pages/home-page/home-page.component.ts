import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.enum';
import { TributiStep } from '../../models/tributi-step';
import { AvvisiStep } from '../../models/avvisi-step';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;
  private avvisiStepEnum = AvvisiStep;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO chiamata per sapere se andare su tributi o su impostazioni
    this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.tributiStepEnum.STEP0]).catch(reason => reason);
    // this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.avvisiStepEnum.STEP0]).catch(reason => reason);
  }
}
