import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLocalStorageModule } from 'ngx-localstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { LoginSpidService } from '../../services/login-spid.service';
import { LoginSpidPageComponent } from './login-spid-page.component';

describe('LoginSpidPageComponent', () => {
  let component: LoginSpidPageComponent;
  let fixture: ComponentFixture<LoginSpidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxLocalStorageModule.forRoot(), RouterTestingModule],
      declarations: [LoginSpidPageComponent],
      providers: [LoaderService, LoginSpidService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSpidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
