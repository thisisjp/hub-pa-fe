import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { RouterTestingModule } from '@angular/router/testing';
import { SidebarMenuComponent } from './sidebar-menu.component';

describe('SidebarMenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({}), RouterTestingModule],
      declarations: [SidebarMenuComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarMenuComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
