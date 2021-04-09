import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AvvisiStep1CaricaPosizioniComponent } from './avvisi-step1-carica-posizioni.component';

describe('AvvisiStep1CaricaPosizioniComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [AvvisiStep1CaricaPosizioniComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AvvisiStep1CaricaPosizioniComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
