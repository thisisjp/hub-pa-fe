import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from './error.service';

import { SecurityInterceptorService } from './security-interceptor.service';
import { TokenService } from './token.service';

describe('SecurityInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot({})
      ],
      providers: [SecurityInterceptorService, ErrorService, TokenService]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(SecurityInterceptorService)).toBeTruthy();
  });
});
