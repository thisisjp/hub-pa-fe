import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.enum';
import { TributiStep } from '../../models/tributi-step';
import { TributeService } from '../../services/tribute.service';

@Component({
  selector: 'app-tributi-page',
  templateUrl: './tributi-page.component.html',
  styleUrls: ['./tributi-page.component.sass']
})
export class TributiPageComponent implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;

  constructor(private router: Router, private tributeService: TributeService) {}

  ngOnInit(): void {
    if (this.tributeService.isServiceConfigurated('')) {
      this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP4]).catch(reason => reason);
    } else {
      this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP1]).catch(reason => reason);
    }
  }
}
