import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response';
import { UploadCSVModel } from '../models/upload-csv-model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public uploadCSV(model: UploadCSVModel): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(environment.API_URL + '/upload-payments', model);
  }
}
