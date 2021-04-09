import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { TributiStep1ImpostaEntiComponent } from './tributi-step1-imposta-enti.component';

describe('TributiStep1ImpostaEntiComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({})],
      declarations: [TributiStep1ImpostaEntiComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TributiStep1ImpostaEntiComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});