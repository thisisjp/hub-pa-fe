import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/enums/menu.enum';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.sass']
})
export class NotFoundPageComponent {
  menuEnum = Menu;

  constructor(private router: Router, private tokenService: TokenService) {}

  goToPage(): void {
    const path = this.tokenService.getToken() ? this.menuEnum.HOME_PATH : '';
    this.router.navigate([path]).catch(reason => reason);
  }
}
