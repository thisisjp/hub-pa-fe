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
import { ErrorStatus } from '../models/error-status.enum';
import { Message } from '../models/message';
import { MessageType } from '../models/message-type.enum';
import { TokenService } from './token.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';

@Injectable()
export class SecurityInterceptorService implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent | HttpUserEvent<any>> {
    const reqUrl = request ? request.url : '';
    const token = this.tokenService.getToken();
    const requestOut = this.createRequest(request, token);
    // TODO controllare i path
    if (reqUrl.indexOf('secure') >= 0 && !(token && !this.tokenService.isTokenExpired())) {
      this.tokenService.setIsLogged(false);
      this.tokenService.setToken('');
      void this.router.navigate(['/sessionexpired']);
    }

    return next.handle(requestOut).pipe(
      tap(res => {
        // TODO controllare i path
        if (reqUrl.indexOf('secure') >= 0 && res instanceof HttpResponse) {
          const newToken = res.headers.get('API-Token');
          this.tokenService.setToken(newToken ? newToken : '');
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
    }
    this.loaderService.endRequest();
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
}
