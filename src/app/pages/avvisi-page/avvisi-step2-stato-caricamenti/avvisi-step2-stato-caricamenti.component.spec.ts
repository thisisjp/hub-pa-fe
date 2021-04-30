import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvvisiStep2StatoCaricamentiComponent } from './avvisi-step2-stato-caricamenti.component';

describe('AvvisiStep2StatoCaricamentiComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [AvvisiStep2StatoCaricamentiComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AvvisiStep2StatoCaricamentiComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
