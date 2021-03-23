import { TestBed } from '@angular/core/testing';

import { GestioneAvvisiPagamentoPageComponent } from './gestione-avvisi-pagamento-page.component';

describe('GestioneAvvisiPagamentoPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneAvvisiPagamentoPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GestioneAvvisiPagamentoPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
