import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorStatus } from '../models/enums/error-status.enum';
import { Message } from '../models/message';
import { MessageType } from '../models/enums/message-type.enum';
import { TokenService } from './token.service';
import { ErrorService } from './error.service';

@Injectable()
export class SecurityInterceptorService implements HttpInterceptor {
  private requestCount = 0;

  constructor(
    private errorService: ErrorService,
    private tokenService: TokenService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent | HttpUserEvent<any>> {
    const reqUrl = request ? request.url : '';
    const token = this.tokenService.getToken();
    const requestOut = this.createRequest(request, token);
    if (reqUrl.indexOf('secure') >= 0 && !(token && !this.tokenService.isTokenExpired())) {
      this.tokenService.setIsLogged(false);
      this.router.navigate(['/sessionexpired']).catch(reason => reason);
    }
    this.startRequest();
    return next.handle(requestOut).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.endRequest();
        }
      }),
      catchError(response => this.mapError(response))
    );
  }

  buildError(error: any): Message {
    return new Message(JSON.parse(error).code, MessageType.DANGER);
  }

  mapError(response: { status: any; error: any }): Observable<never> {
    if (response instanceof HttpErrorResponse) {
      switch (response.status) {
        case ErrorStatus.EXCEPTION_FAILED:
        case ErrorStatus.USER_NOT_FOUND:
          this.errorService.setError(this.buildError(response.error));
          break;
        default:
          this.errorService.setError(new Message('GENERIC_ERROR', MessageType.DANGER));
          break;
      }
      this.endRequest();
    }
    return throwError(response);
  }

  createRequest(requestIn: HttpRequest<any>, token: string): HttpRequest<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    if (token && !this.tokenService.isTokenExpired()) {
      return requestIn.clone({ headers });
    } else {
      return requestIn;
    }
  }

  startRequest(): void {
    // eslint-disable-next-line functional/immutable-data
    ++this.requestCount;
    if (this.requestCount === 1) {
      this.spinnerService.show().catch(reason => reason);
    }
  }

  endRequest(): void {
    if (this.requestCount === 0) {
      this.spinnerService.hide().catch(reason => reason);
      return;
    }
    // eslint-disable-next-line functional/immutable-data
    --this.requestCount;
    if (this.requestCount === 0) {
      this.spinnerService.hide().catch(reason => reason);
    }
  }
}
