import { TestBed } from '@angular/core/testing';

import { AiutoPageComponent } from './aiuto-page.component';

describe('AiutoPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiutoPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AiutoPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
