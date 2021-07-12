import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private storageService: SessionStorageService) {}

  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // public isLoggedObservable(): Observable<boolean> {
  //   return this.isLogged.asObservable();
  // }

  public setIsLogged(isLogged: boolean): void {
    if (!isLogged) {
      this.storageService.clear();
    }
    this.isLogged.next(isLogged);
  }

  public setToken(token: string): void {
    this.storageService.store('token', token);
  }

  public getToken(): string {
    const token = this.storageService.retrieve('token');
    return token ? token : '';
  }

  // getDecodedAccessToken(): any {
  //   try {
  //     return this.getTokenHelper().decodeToken(this.getToken());
  //   } catch (Error) {
  //     return null;
  //   }
  // }

  isTokenExpired(): boolean {
    return false;
  }

  // getDefaultRoute(): string {
  //   return this.getDecodedAccessToken() ? this.getDecodedAccessToken().defaultRoute : '';
  // }

  // getTokenHelper(): JwtHelperService {
  //   return new JwtHelperService();
  // }

  public setFiscalCodeREFP(fiscalCode: string): void {
    this.storageService.store('fiscalCodeREFP', fiscalCode);
  }

  public getFiscalCodeREFP(): string {
    const fiscalCode = this.storageService.retrieve('fiscalCodeREFP');
    return fiscalCode ? fiscalCode : '';
  }

  public setFiscalCode(fiscalCode: string): void {
    this.storageService.store('fiscalCode', fiscalCode);
  }

  public getFiscalCode(): string {
    const fiscalCode = this.storageService.retrieve('fiscalCode');
    return fiscalCode ? fiscalCode : '';
  }

  public setDesAmm(desAmm: string): void {
    this.storageService.store('desAmm', desAmm);
  }

  public getDesAmm(): string {
    const desAmm = this.storageService.retrieve('desAmm');
    return desAmm ? desAmm : '';
  }

  public setCodiceInterbancario(codiceInterbancario: string): void {
    this.storageService.store('codiceInterbancario', codiceInterbancario);
  }

  public getCodiceInterbancario(): string {
    const codiceInterbancario = this.storageService.retrieve('codiceInterbancario');
    return codiceInterbancario ? codiceInterbancario : '';
  }
}
