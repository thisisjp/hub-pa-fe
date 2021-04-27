import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/enums/menu.enum';
import { TokenService } from '../../services/token.service';
import { ServiceManagementService } from '../../services/service-management.service';

@Component({
  selector: 'app-tributi-page',
  templateUrl: './tributi-page.component.html',
  styleUrls: ['./tributi-page.component.sass']
})
export class TributiPageComponent implements OnInit {
  private menuEnum = Menu;

  constructor(
    private router: Router,
    private serviceManagementService: ServiceManagementService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceManagementService.isServiceConfigurated(this.tokenService.getFiscalCode()).subscribe(res => {
      if (res && res.result) {
        this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP4]).catch(reason => reason);
      } else if (res && !res.result) {
        this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP1]).catch(reason => reason);
      }
    });
  }
}
