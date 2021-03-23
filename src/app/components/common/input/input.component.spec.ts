import { TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
