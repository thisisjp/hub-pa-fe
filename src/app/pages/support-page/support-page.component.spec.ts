import { TestBed } from '@angular/core/testing';

import { SupportPageComponent } from './support-page.component';

describe('SupportPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SupportPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
