import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { AvvisiStep } from '../../../models/avvisi-step';
import { Notifica } from '../../../models/notifica';

declare function notificationShow(notificationTarget: string, notificationTimeOut: number): any;

@Component({
  selector: 'app-avvisi-step0',
  templateUrl: './avvisi-step0-home.component.html',
  styleUrls: ['./avvisi-step0-home.component.sass']
})
export class AvvisiStep0HomeComponent implements OnInit {
  menuEnum = Menu;
  private avvisiStepEnum = AvvisiStep;
  notifica: Notifica = new Notifica('', '');

  constructor(private router: Router) {}

  ngOnInit(): void {
    const defaultValues = history.state?.data;
    if (defaultValues?.title && defaultValues?.message) {
      // eslint-disable-next-line functional/immutable-data
      this.notifica = new Notifica(defaultValues?.title, defaultValues?.message);
      notificationShow('not2dms', 0);
    }
  }

  nextStep(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.avvisiStepEnum.STEP1]).catch(reason => reason);
  }

  goToPage(path: string): void {
    this.router.navigate([path]).catch(reason => reason);
  }
}
