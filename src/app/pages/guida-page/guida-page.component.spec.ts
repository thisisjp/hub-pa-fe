import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GuidaPageComponent } from './guida-page.component';

describe('GuidaPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuidaPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GuidaPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
