import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { TributiStep2DefinisciRateComponent } from './tributi-step2-definisci-rate.component';

describe('TributiStep2DefinisciRateComponent', () => {
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
      declarations: [TributiStep2DefinisciRateComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TributiStep2DefinisciRateComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
