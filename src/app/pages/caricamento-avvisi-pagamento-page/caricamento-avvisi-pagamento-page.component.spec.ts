import { TestBed } from '@angular/core/testing';

import { CaricamentoAvvisiPagamentoPageComponent } from './caricamento-avvisi-pagamento-page.component';

describe('CaricamentoAvvisiPagamentoPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaricamentoAvvisiPagamentoPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CaricamentoAvvisiPagamentoPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
