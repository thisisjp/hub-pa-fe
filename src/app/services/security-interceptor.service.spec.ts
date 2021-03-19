import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';

import { SecurityInterceptorService } from './security-interceptor.service';
import { TokenService } from './token.service';

describe('SecurityInterceptorService', () => {
  let service: SecurityInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxLocalStorageModule.forRoot(), RouterTestingModule],
      providers: [SecurityInterceptorService, LoaderService, ErrorService, TokenService]
    });
    service = TestBed.inject(SecurityInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
