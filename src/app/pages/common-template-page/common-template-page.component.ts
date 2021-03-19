import { Component } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-common-template-page',
  templateUrl: './common-template-page.component.html',
  styleUrls: ['./common-template-page.component.sass']
})
export class CommonTemplatePageComponent {
  message: Message = new Message('', '');
  menu = [
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
}
