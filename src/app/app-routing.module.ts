import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiutoPageComponent } from './pages/aiuto-page/aiuto-page.component';
import { SessionExpiredPageComponent } from './pages/session-expired-page/session-expired-page.component';
import { TributiPageComponent } from './pages/tributi-page/tributi-page.component';
import { GuidaPageComponent } from './pages/guida-page/guida-page.component';
import { AvvisiPageComponent } from './pages/avvisi-page/avvisi-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginSpidPageComponent } from './pages/login-spid-page/login-spid-page.component';
import { Menu } from './models/enums/menu.enum';
import { TributiStep0HomeComponent } from './pages/home-page/tributi-step0-home/tributi-step0-home.component';
import { TributiStep2DefinisciRateComponent } from './pages/tributi-page/tributi-step2-definisci-rate/tributi-step2-definisci-rate.component';
import { TributiStep1ImpostaEntiComponent } from './pages/tributi-page/tributi-step1-imposta-enti/tributi-step1-imposta-enti.component';
import { TributiStep3VerificaDatiComponent } from './pages/tributi-page/tributi-step3-verifica-dati/tributi-step3-verifica-dati.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AvvisiStep0HomeComponent } from './pages/home-page/avvisi-step0-home/avvisi-step0-home.component';
import { AvvisiStep1CaricaPosizioniComponent } from './pages/avvisi-page/avvisi-step1-carica-posizioni/avvisi-step1-carica-posizioni.component';
import { AvvisiStep2StatoCaricamentiComponent } from './pages/avvisi-page/avvisi-step2-stato-caricamenti/avvisi-step2-stato-caricamenti.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TributiStep4ViewComponent } from './pages/tributi-page/tributi-step4-view/tributi-step4-view.component';
import { LoginSpidSuccessComponent } from './pages/login-spid-success/login-spid-success.component';
import { PosizioniHomeComponent } from './pages/home-page/posizioni-home/posizioni-home.component';

const menuEnum = Menu;

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'secure', redirectTo: '/' + menuEnum.HOME_PATH, pathMatch: 'full' },
  { path: 'login', component: LoginSpidPageComponent, pathMatch: 'full' },
  { path: 'success', component: LoginSpidSuccessComponent },
  { path: 'sessionexpired', component: SessionExpiredPageComponent, pathMatch: 'full' },
  { path: menuEnum.AIUTO_PATH, component: AiutoPageComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: menuEnum.GUIDA_PATH, component: GuidaPageComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  {
    path: menuEnum.HOME_PATH,
    component: HomePageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: menuEnum.TRIBUTI_STEP0,
        component: TributiStep0HomeComponent
      },
      {
        path: menuEnum.AVVISI_STEP0,
        component: AvvisiStep0HomeComponent
      },
      {
        path: menuEnum.POSIZIONI_STEP0,
        component: PosizioniHomeComponent
      }
    ]
  },
  {
    path: menuEnum.TRIBUTI_PATH,
    component: TributiPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: menuEnum.TRIBUTI_STEP1,
        component: TributiStep1ImpostaEntiComponent
      },
      {
        path: menuEnum.TRIBUTI_STEP2,
        component: TributiStep2DefinisciRateComponent
      },
      {
        path: menuEnum.TRIBUTI_STEP3,
        component: TributiStep3VerificaDatiComponent
      },
      {
        path: menuEnum.TRIBUTI_STEP4,
        component: TributiStep4ViewComponent
      }
    ]
  },
  {
    path: menuEnum.AVVISI_PATH,
    component: AvvisiPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: menuEnum.AVVISI_STEP1,
        component: AvvisiStep1CaricaPosizioniComponent
      },
      {
        path: menuEnum.AVVISI_STEP2,
        component: AvvisiStep2StatoCaricamentiComponent
      }
    ]
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
