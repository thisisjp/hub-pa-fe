import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProvidersList } from '../models/providers-list';
import { AuthSpid } from '../models/auth-spid';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSpidService {
  providers?: ProvidersList;
  authSpid?: AuthSpid;

  constructor(
    private http: HttpClient,
    private loadingService: LoaderService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  public getProvidersList(): Subscription {
    this.loadingService.startRequest();
    const url = environment.HOST_URL + '/list-providers'; // TODO controllare path
    return this.http.get<ProvidersList>(url).subscribe(res => {
      if (res) {
        // eslint-disable-next-line functional/immutable-data
        this.providers = res;
        this.loadingService.endRequest();
      }
    });
  }

  public getAuthSpid(testFormEl: any, entityId: string): void {
    this.loadingService.startRequest();
    const url = environment.HOST_URL + '/auth-spid?entityId=' + entityId;
    this.http.get<AuthSpid>(url).subscribe(res => {
      if (res) {
        // eslint-disable-next-line functional/immutable-data
        this.authSpid = res;
        setTimeout((_: any) => testFormEl.nativeElement.submit());
        // testFormEl.nativeElement.submit(); // TODO
        this.loadingService.endRequest();
      }
    });
  }

  public getToken(samlResponse: string): void {
    this.loadingService.startRequest();
    const url = environment.HOST_URL + '/send-response-test';
    this.http.post<string>(url, samlResponse).subscribe(res => {
      if (res) {
        this.tokenService.setToken(JSON.parse(res));
        this.tokenService.setIsLogged(true);
        void this.router.navigate(['/secure']);
      }
      this.loadingService.endRequest();
    });
  }
}
