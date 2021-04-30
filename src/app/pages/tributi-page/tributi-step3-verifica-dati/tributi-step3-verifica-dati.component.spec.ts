import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TributiStep3VerificaDatiComponent } from './tributi-step3-verifica-dati.component';

describe('TributiStep3VerificaDatiComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot({})
      ],
      declarations: [TributiStep3VerificaDatiComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TributiStep3VerificaDatiComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
