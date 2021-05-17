import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenIntrospectResponse } from '../models/token-introspect-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  onGetAuthSpid(entityId: string): void {
    // eslint-disable-next-line functional/immutable-data
    location.href =
      environment.API_URL + environment.PREFIX_URL_AUTH + '/login?entityID=' + entityId + '&authLevel=SpidL2';
  }

  getFiscalCodeByToken(token: string): Observable<TokenIntrospectResponse> {
    return this.http.post<TokenIntrospectResponse>(environment.API_URL + environment.PREFIX_URL_AUTH + '/introspect', {
      token
    });
  }
}
