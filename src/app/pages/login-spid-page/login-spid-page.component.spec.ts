import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NgxLocalStorageModule } from 'ngx-localstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginSpidService } from '../../services/login-spid.service';
import { LoginSpidPageComponent } from './login-spid-page.component';

describe('LoginSpidPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot({})
      ],
      declarations: [LoginSpidPageComponent],
      providers: [LoginSpidService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginSpidPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
