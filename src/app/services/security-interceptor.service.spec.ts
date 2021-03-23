import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';

import { SecurityInterceptorService } from './security-interceptor.service';
import { TokenService } from './token.service';

describe('SecurityInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxLocalStorageModule.forRoot(), RouterTestingModule],
      providers: [SecurityInterceptorService, LoaderService, ErrorService, TokenService]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(SecurityInterceptorService)).toBeTruthy();
  });
});
