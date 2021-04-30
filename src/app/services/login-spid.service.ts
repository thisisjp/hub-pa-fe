import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProvidersList } from '../models/providers-list';
import { AuthSpid } from '../models/auth-spid';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSpidService {
  providers?: ProvidersList;
  authSpid?: AuthSpid;

  constructor(private http: HttpClient) {}

  public getProvidersList(): void {
    this.http
      .get<ProvidersList>(environment.API_URL + environment.PREFIX_URL_IDP + '/list-providers')
      .subscribe(res => {
        if (res) {
          // eslint-disable-next-line functional/immutable-data
          this.providers = res;
        }
      });
  }

  public getAuthSpid(testFormEl: any, entityId: string): void {
    // eslint-disable-next-line functional/immutable-data
    location.href =
      environment.API_URL + environment.PREFIX_URL_AUTH + '/auth/login?entityID=' + entityId + '&authLevel=SpidL2';
  }
}
