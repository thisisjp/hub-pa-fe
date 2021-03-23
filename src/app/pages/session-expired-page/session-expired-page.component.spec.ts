import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SessionExpiredPageComponent } from './session-expired-page.component';

describe('SessionExpiredPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({})],
      declarations: [SessionExpiredPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SessionExpiredPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
