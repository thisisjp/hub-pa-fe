import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { LoginSpidService } from './login-spid.service';

describe('LoginSpidService', () => {
  let service: LoginSpidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxLocalStorageModule.forRoot(), RouterTestingModule]
    });
    service = TestBed.inject(LoginSpidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
