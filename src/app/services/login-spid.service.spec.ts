import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { LoginSpidService } from './login-spid.service';

describe('LoginSpidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxLocalStorageModule.forRoot(), RouterTestingModule]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(LoginSpidService)).toBeTruthy();
  });
});
