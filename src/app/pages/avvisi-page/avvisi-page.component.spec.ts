import { TestBed } from '@angular/core/testing';

import { AvvisiPageComponent } from './avvisi-page.component';

describe('AvvisiPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvvisiPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AvvisiPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
