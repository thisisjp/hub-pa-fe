import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocumentazioneUtilizzoPortalePageComponent } from './documentazione-utilizzo-portale-page.component';

describe('DocumentazioneUtilizzoPortalePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentazioneUtilizzoPortalePageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DocumentazioneUtilizzoPortalePageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
