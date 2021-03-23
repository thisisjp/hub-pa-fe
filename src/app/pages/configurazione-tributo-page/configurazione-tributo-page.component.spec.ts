import { TestBed } from '@angular/core/testing';

import { ConfigurazioneTributoPageComponent } from './configurazione-tributo-page.component';

describe('ConfigurazioneTributoPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurazioneTributoPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ConfigurazioneTributoPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
