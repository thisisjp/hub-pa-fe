import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CommonTemplatePageComponent } from './common-template-page.component';

describe('CommonTemplatePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonTemplatePageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CommonTemplatePageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
