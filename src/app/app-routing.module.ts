import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportPageComponent } from './pages/support-page/support-page.component';
import { CommonTemplatePageComponent } from './pages/common-template-page/common-template-page.component';
import { SessionExpiredPageComponent } from './pages/session-expired-page/session-expired-page.component';
import { ConfigurazioneTributoPageComponent } from './pages/configurazione-tributo-page/configurazione-tributo-page.component';
import { DocumentazioneUtilizzoPortalePageComponent } from './pages/documentazione-utilizzo-portale-page/documentazione-utilizzo-portale-page.component';
import { GestioneAvvisiPagamentoPageComponent } from './pages/gestione-avvisi-pagamento-page/gestione-avvisi-pagamento-page.component';
import { CaricamentoAvvisiPagamentoPageComponent } from './pages/caricamento-avvisi-pagamento-page/caricamento-avvisi-pagamento-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginSpidPageComponent } from './pages/login-spid-page/login-spid-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginSpidPageComponent, pathMatch: 'full' },
  {
    path: 'sessionexpired',
    component: SessionExpiredPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  { path: 'support', component: SupportPageComponent, pathMatch: 'full' },
  {
    path: 'secure',
    component: CommonTemplatePageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'documentazioneUtilizzoPortale',
        component: DocumentazioneUtilizzoPortalePageComponent
      },
      {
        path: 'configurazioneTributo',
        component: ConfigurazioneTributoPageComponent
      },
      {
        path: 'caricamentoAvvisiPagamento',
        component: CaricamentoAvvisiPagamentoPageComponent
      },
      {
        path: 'gestioneAvvisiPagamento',
        component: GestioneAvvisiPagamentoPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true, // TODD controllare in caso di errori 404 in deploy
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
