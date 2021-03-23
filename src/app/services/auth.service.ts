import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public login(request: Login): Observable<string> {
    return this.http.post<string>(environment.API_URL + '/login', request, { responseType: 'text' as 'json' });
  }

  public logout(): Observable<string> {
    const token = this.tokenService.getToken();
    return this.http.post<string>(environment.API_URL + '/logout', token, { responseType: 'text' as 'json' });
  }
}
