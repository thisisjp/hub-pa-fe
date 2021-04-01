import { TestBed } from '@angular/core/testing';

import { ImpostazioniPageComponent } from './impostazioni-page.component';

describe('ImpostazioniPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImpostazioniPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ImpostazioniPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
