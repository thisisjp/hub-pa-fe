import { Component, OnInit } from '@angular/core';
import { ProvidersList } from '../../models/providers-list';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login-spid-page',
  templateUrl: './login-spid-page.component.html',
  styleUrls: ['./login-spid-page.component.sass']
})
export class LoginSpidPageComponent implements OnInit {
  providers: ProvidersList = environment.IDPS;
  spidServeAiuto = environment.spidServeAiuto;
  supportMail = environment.supportMail;

  constructor(private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.setIsLogged(false);
  }

  onGetAuthSpid(entityId: string): void {
    this.authService.onGetAuthSpid(entityId);
  }
}
