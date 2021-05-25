import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/enums/menu.enum';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.sass']
})
export class NotFoundPageComponent {
  menuEnum = Menu;

  constructor(private router: Router) {}

  goToPage(path: string): void {
    this.router.navigate([path]).catch(reason => reason);
  }
}
