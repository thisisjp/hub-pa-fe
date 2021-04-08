import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.enum';
import { AvvisiStep } from '../../models/avvisi-step';

@Component({
  selector: 'app-avvisi-page',
  templateUrl: './avvisi-page.component.html',
  styleUrls: ['./avvisi-page.component.sass']
})
export class AvvisiPageComponent implements OnInit {
  private menuEnum = Menu;
  private avvisiStepEnum = AvvisiStep;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.avvisiStepEnum.STEP1]).catch(reason => reason);
  }
}
