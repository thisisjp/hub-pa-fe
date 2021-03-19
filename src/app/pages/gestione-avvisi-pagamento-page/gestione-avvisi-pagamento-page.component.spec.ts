import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAvvisiPagamentoPageComponent } from './gestione-avvisi-pagamento-page.component';

describe('GestioneAvvisiPagamentoPageComponent', () => {
  let component: GestioneAvvisiPagamentoPageComponent;
  let fixture: ComponentFixture<GestioneAvvisiPagamentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneAvvisiPagamentoPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneAvvisiPagamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
