import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AvvisiStep0HomeComponent } from './avvisi-step0-home.component';

describe('AvvisiStep0HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [AvvisiStep0HomeComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AvvisiStep0HomeComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
