import { TestBed } from '@angular/core/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from './token.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot({})
      ]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(TokenService)).toBeTruthy();
  });
});
