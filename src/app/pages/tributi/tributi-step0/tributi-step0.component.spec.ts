import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TributiStep0Component } from './tributi-step0.component';

describe('TributiStep0Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({})],
      declarations: [TributiStep0Component]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TributiStep0Component);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
