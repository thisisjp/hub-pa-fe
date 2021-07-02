import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Menu } from '../../models/enums/menu.enum';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  menuEnum = Menu;

  constructor(private router: Router, public tokenService: TokenService) {}

  goToPage(path: string): void {
    if (!this.isPathActive(path) && this.canShowSecureComponents()) {
      this.router.navigate([path]).catch(reason => reason);
    }
  }

  logout(): void {
    this.tokenService.setIsLogged(false);
    this.router.navigate(['']).catch(reason => reason);
  }

  canShowSecureComponents(): boolean {
    return location.href.indexOf('secure') >= 1;
  }

  isPathActive(path: string): boolean {
    return location.href.indexOf(path) >= 1;
  }

  openModalLogout(): void {
    $('#logoutModal').modal();
  }
}
