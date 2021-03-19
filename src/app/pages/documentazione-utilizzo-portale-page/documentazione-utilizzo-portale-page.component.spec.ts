import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentazioneUtilizzoPortalePageComponent } from './documentazione-utilizzo-portale-page.component';

describe('DocumentazioneUtilizzoPortalePageComponent', () => {
  let component: DocumentazioneUtilizzoPortalePageComponent;
  let fixture: ComponentFixture<DocumentazioneUtilizzoPortalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentazioneUtilizzoPortalePageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentazioneUtilizzoPortalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
