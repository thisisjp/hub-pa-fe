import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private storageService: LocalStorageService) {}

  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoggedObservable(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  public setIsLogged(isLogged: boolean): void {
    if (!isLogged) {
      this.removeToken();
      this.removeFiscalCodeREFP();
      this.removeFiscalCode();
    }
    this.isLogged.next(isLogged);
  }

  public setToken(token: string): void {
    this.storageService.set('token', token);
  }

  public getToken(): string {
    const token = this.storageService.get('token');
    return token ? token : '';
  }

  public removeToken(): void {
    this.storageService.remove('token');
  }

  getDecodedAccessToken(): any {
    try {
      return this.getTokenHelper().decodeToken(this.getToken());
    } catch (Error) {
      return null;
    }
  }

  isTokenExpired(): boolean {
    return false;
  }

  getDefaultRoute(): string {
    return this.getDecodedAccessToken() ? this.getDecodedAccessToken().defaultRoute : '';
  }

  getTokenHelper(): JwtHelperService {
    return new JwtHelperService();
  }

  public setFiscalCodeREFP(fiscalCode: string): void {
    this.storageService.set('fiscalCodeREFP', fiscalCode);
  }

  public getFiscalCodeREFP(): string {
    const fiscalCode = this.storageService.get('fiscalCodeREFP');
    return fiscalCode ? fiscalCode : '';
  }

  public removeFiscalCodeREFP(): void {
    this.storageService.remove('fiscalCodeREFP');
  }

  public setFiscalCode(fiscalCode: string): void {
    this.storageService.set('fiscalCode', fiscalCode);
  }

  public getFiscalCode(): string {
    const fiscalCode = this.storageService.get('fiscalCode');
    return fiscalCode ? fiscalCode : '';
  }

  public removeFiscalCode(): void {
    this.storageService.remove('fiscalCode');
  }
}
