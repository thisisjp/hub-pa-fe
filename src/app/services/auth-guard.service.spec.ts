import { TestBed } from '@angular/core/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      providers: [AuthGuardService]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(AuthGuardService)).toBeTruthy();
  });
});
