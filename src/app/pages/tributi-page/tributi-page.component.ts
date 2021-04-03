import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.enum';
import { TributiStep } from '../../models/tributi-step';

@Component({
  selector: 'app-tributi-page',
  templateUrl: './tributi-page.component.html',
  styleUrls: ['./tributi-page.component.sass']
})
export class TributiPageComponent implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO chiamata per sapere se è già presente un tributo o meno
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP0]);
  }
}
