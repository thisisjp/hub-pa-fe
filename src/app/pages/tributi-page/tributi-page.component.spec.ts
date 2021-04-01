import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TributiPageComponent } from './tributi-page.component';

describe('TributiPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TributiPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TributiPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
