import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.enum';
import { TokenService } from '../../services/token.service';
import { ServiceManagementService } from '../../services/service-management.service';
import { UploadPaymentsService } from '../../services/upload-payments.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {
  private menuEnum = Menu;

  constructor(
    private router: Router,
    private serviceManagementService: ServiceManagementService,
    private uploadPaymentsService: UploadPaymentsService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceManagementService.isServiceConfigurated(this.tokenService.getFiscalCode()).subscribe(res => {
      if (res && res.result) {
        this.uploadPaymentsService.isPaymentJobAvailable(this.tokenService.getFiscalCode()).subscribe(res2 => {
          if (res2 && res2.result) {
            this.router
              .navigate([this.menuEnum.HOME_PATH + '/' + this.menuEnum.POSIZIONI_STEP0])
              .catch(reason => reason);
          } else if (res2 && !res2.result) {
            this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.menuEnum.AVVISI_STEP0]).catch(reason => reason);
          }
        });
      } else if (res && !res.result) {
        this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.menuEnum.TRIBUTI_STEP0]).catch(reason => reason);
      }
    });
  }
}
