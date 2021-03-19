import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricamentoAvvisiPagamentoPageComponent } from './caricamento-avvisi-pagamento-page.component';

describe('CaricamentoAvvisiPagamentoPageComponent', () => {
  let component: CaricamentoAvvisiPagamentoPageComponent;
  let fixture: ComponentFixture<CaricamentoAvvisiPagamentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaricamentoAvvisiPagamentoPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaricamentoAvvisiPagamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
