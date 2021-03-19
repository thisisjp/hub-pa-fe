import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { ErrorService } from '../../../services/error.service';
import { Menu } from '../../../models/menu';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.sass']
})
export class SidebarMenuComponent implements OnInit {
  constructor(private menuService: MenuService, private errorService: ErrorService) {}

  menu: Array<Menu> = [];
  selected: Menu = new Menu();

  @Input('menu') set setMenu(value: Array<Menu>) {
    this.menu = value;
    if (this.menu) {
      this.selected = this.menu[0];
    }
  }

  ngOnInit(): void {
    this.menuService.isMenuObservable().subscribe(menu => {
      if (menu) {
        const selected1 = this.menu.find(m => m.code === menu);
        if (selected1) {
          this.selected = selected1;
        }
      }
    });
  }

  onSelectMenu(m: Menu): void {
    this.selected = m;
    this.errorService.setError(new Message('', ''));
  }
}
