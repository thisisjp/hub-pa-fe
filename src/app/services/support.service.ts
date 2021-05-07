import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Support } from '../models/support';
import { BaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  constructor(private http: HttpClient) {}

  private url = environment.API_URL + environment.PREFIX_URL_SUPPORT + '/support';

  send(model: Support): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.url + '/send', model);
  }
}
