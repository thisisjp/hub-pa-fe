import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurazioneTributoPageComponent } from './configurazione-tributo-page.component';

describe('ConfigurazioneTributoPageComponent', () => {
  let component: ConfigurazioneTributoPageComponent;
  let fixture: ComponentFixture<ConfigurazioneTributoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurazioneTributoPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurazioneTributoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
