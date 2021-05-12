import { Component } from '@angular/core';
import { ProvidersList } from '../../models/providers-list';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-spid-page',
  templateUrl: './login-spid-page.component.html',
  styleUrls: ['./login-spid-page.component.sass']
})
export class LoginSpidPageComponent {
  providers: ProvidersList = environment.IDPS;

  onGetAuthSpid(entityId: string): void {
    // eslint-disable-next-line functional/immutable-data
    location.href =
      environment.API_URL + environment.PREFIX_URL_AUTH + '/auth/login?entityID=' + entityId + '&authLevel=SpidL2';
  }
}
