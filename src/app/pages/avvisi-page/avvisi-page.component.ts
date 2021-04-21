import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.enum';

@Component({
  selector: 'app-avvisi-page',
  templateUrl: './avvisi-page.component.html',
  styleUrls: ['./avvisi-page.component.sass']
})
export class AvvisiPageComponent implements OnInit {
  private menuEnum = Menu;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.menuEnum.AVVISI_STEP1]).catch(reason => reason);
  }
}
