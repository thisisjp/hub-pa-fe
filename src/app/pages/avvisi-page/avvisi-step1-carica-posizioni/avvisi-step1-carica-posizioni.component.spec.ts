import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadPaymentsService } from '../../../services/upload-payments.service';
import { ServiceManagementService } from '../../../services/service-management.service';
import { AvvisiStep1CaricaPosizioniComponent } from './avvisi-step1-carica-posizioni.component';

describe('AvvisiStep1CaricaPosizioniComponent', () => {
  beforeEach(async () => {
    // Make the spy return a synchronous Observable with the test data
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [AvvisiStep1CaricaPosizioniComponent],
      providers: [UploadPaymentsService, ServiceManagementService]
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
});
