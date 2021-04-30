import { TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSpidSuccessComponent } from './login-spid-success.component';

describe('LoginSpidSuccessComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [LoginSpidSuccessComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginSpidSuccessComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
