import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TributiStep4ViewComponent } from './tributi-step4-view.component';

describe('TributiStep4ViewComponent', () => {
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
      declarations: [TributiStep4ViewComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TributiStep4ViewComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
