import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { LoaderService } from 'src/app/services/loader.service';
import { TributeService } from 'src/app/services/tribute.service';
import { UploadService } from 'src/app/services/upload.service';
import { AvvisiStep1CaricaPosizioniComponent } from './avvisi-step1-carica-posizioni.component';

describe('AvvisiStep1CaricaPosizioniComponent', () => {
  beforeEach(async () => {
    const loaderService = jasmine.createSpyObj('LoaderService', ['startRequest']);
    // Make the spy return a synchronous Observable with the test data
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [AvvisiStep1CaricaPosizioniComponent],
      providers: [{ provide: LoaderService, useValue: loaderService }, UploadService, TributeService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AvvisiStep1CaricaPosizioniComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('test2', () => {
    const fixture = TestBed.createComponent(AvvisiStep1CaricaPosizioniComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.getYear('77')).toBe(1977);
    expect(component.checkcodicefiscale('MRARSS20L06G702F')).toBe(true);
    expect(component.checkpiva('08526440154')).toBe(true);
    expect(component.parse(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F-', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', '-', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse([
        'MRARSS20L06G702F',
        'F',
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', '', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', '', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', '', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', '', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', '', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', '', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', '', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', '', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', '', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', ''])
    ).toBeUndefined();
    expect(
      component.parse(['MRARSS20L06G702F', 'F', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P'])
    ).toBeUndefined();
  });
  // yarn test:pipe --include=src\app\pages\avvisi-page\avvisi-step1-carica-posizioni\*.spec.ts
});
