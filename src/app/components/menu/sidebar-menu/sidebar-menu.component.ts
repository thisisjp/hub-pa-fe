import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private menuService: MenuService, private errorService: ErrorService, private router: Router) {}

  menu: Array<Menu> = [
    {
      code: 'Documentazione di utilizzo del portale',
      route: 'documentazioneUtilizzoPortale'
    },
    {
      code: 'Configurazione del tributo',
      route: 'configurazioneTributo'
    },
    {
      code: 'Caricamento avvisi di pagamento',
      route: 'caricamentoAvvisiPagamento'
    },
    {
      code: 'Gestione avvisi di pagamento',
      route: 'gestioneAvvisiPagamento'
    }
  ];

  selected: Menu = this.menu[0];

  ngOnInit(): void {
    const selected1 = this.menu.filter(entry => this.router.url.indexOf(entry.route) > 1)[0];
    if (selected1) {
      // eslint-disable-next-line functional/immutable-data
      this.selected = selected1;
    }
  }

  onSelectMenu(m: Menu): void {
    // eslint-disable-next-line functional/immutable-data
    this.selected = m;
    this.errorService.setError(new Message('', ''));
  }
}
