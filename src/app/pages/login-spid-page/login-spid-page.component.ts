import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from '../../services/loader.service';
import { LoginSpidService } from '../../services/login-spid.service';
import { ProvidersList } from '../../models/providers-list';

@Component({
  selector: 'app-login-spid-page',
  templateUrl: './login-spid-page.component.html',
  styleUrls: ['./login-spid-page.component.sass'],
  providers: [LoaderService, LoginSpidService]
})
export class LoginSpidPageComponent implements OnInit {
  providers?: ProvidersList;
  @ViewChild('testForm') testFormEl: any;

  constructor(
    private loadingService: LoaderService,
    public loginSrv: LoginSpidService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingService.isShowLoaderObservable().subscribe(show => {
      if (show) {
        void this.spinnerService.show();
      } else {
        void this.spinnerService.hide();
      }
    });

    this.loginSrv.getProvidersList();
    this.route.queryParams.subscribe(res => {
      const samlResponse = res.samlResponse;
      if (res && samlResponse) {
        this.loginSrv.getToken(samlResponse);
      }
    });
  }

  onGetAuthSpid(entityId: string): void {
    this.loginSrv.getAuthSpid(this.testFormEl, entityId);
  }
}
