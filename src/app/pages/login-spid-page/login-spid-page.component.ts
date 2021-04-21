import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginSpidService } from '../../services/login-spid.service';

@Component({
  selector: 'app-login-spid-page',
  templateUrl: './login-spid-page.component.html',
  styleUrls: ['./login-spid-page.component.sass'],
  providers: [LoginSpidService]
})
export class LoginSpidPageComponent implements OnInit {
  @ViewChild('testForm') testFormEl: any;

  constructor(public loginSrv: LoginSpidService) {}

  ngOnInit(): void {
    this.loginSrv.getProvidersList();
  }

  onGetAuthSpid(entityId: string): void {
    this.loginSrv.getAuthSpid(this.testFormEl, entityId);
  }
}
