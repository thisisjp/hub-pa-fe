import { Component } from '@angular/core';
import { ProvidersList } from '../../models/providers-list';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-spid-page',
  templateUrl: './login-spid-page.component.html',
  styleUrls: ['./login-spid-page.component.sass']
})
export class LoginSpidPageComponent {
  providers: ProvidersList = environment.IDPS;

  constructor(private authService: AuthService) {}

  onGetAuthSpid(entityId: string): void {
    this.authService.onGetAuthSpid(entityId);
  }
}
