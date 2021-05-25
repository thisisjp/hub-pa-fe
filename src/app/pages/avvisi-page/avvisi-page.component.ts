import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/enums/menu.enum';
import { ServiceManagementService } from '../../services/service-management.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-avvisi-page',
  templateUrl: './avvisi-page.component.html',
  styleUrls: ['./avvisi-page.component.sass']
})
export class AvvisiPageComponent implements OnInit {
  private menuEnum = Menu;

  constructor(
    private router: Router,
    private serviceManagementService: ServiceManagementService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceManagementService.isServiceConfigurated(this.tokenService.getFiscalCode()).subscribe(res => {
      if (res && res.result) {
        this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.menuEnum.AVVISI_STEP1]).catch(reason => reason);
      } else if (res && !res.result) {
        this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.menuEnum.TRIBUTI_STEP0]).catch(reason => reason);
      }
    });
  }
}
