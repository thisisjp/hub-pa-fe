import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiutoPageComponent } from './pages/aiuto-page/aiuto-page.component';
import { SessionExpiredPageComponent } from './pages/session-expired-page/session-expired-page.component';
import { TributiPageComponent } from './pages/tributi-page/tributi-page.component';
import { GuidaPageComponent } from './pages/guida-page/guida-page.component';
import { ImpostazioniPageComponent } from './pages/impostazioni-page/impostazioni-page.component';
import { AvvisiPageComponent } from './pages/avvisi-page/avvisi-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginSpidPageComponent } from './pages/login-spid-page/login-spid-page.component';
import { Menu } from './models/menu.enum';
import { TributiStep0HomeComponent } from './pages/home-page/tributi-step0-home/tributi-step0-home.component';
import { TributiStep2DefinisciRateComponent } from './pages/tributi-page/tributi-step2-definisci-rate/tributi-step2-definisci-rate.component';
import { TributiStep1ImpostaEntiComponent } from './pages/tributi-page/tributi-step1-imposta-enti/tributi-step1-imposta-enti.component';
import { TributiStep3VerificaDatiComponent } from './pages/tributi-page/tributi-step3-verifica-dati/tributi-step3-verifica-dati.component';
import { TributiStep } from './models/tributi-step';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AvvisiStep } from './models/avvisi-step';
import { AvvisiStep0HomeComponent } from './pages/home-page/avvisi-step0-home/avvisi-step0-home.component';
import { AvvisiStep1CaricaPosizioniComponent } from './pages/avvisi-page/avvisi-step1-carica-posizioni/avvisi-step1-carica-posizioni.component';
import { AvvisiStep2StatoCaricamentiComponent } from './pages/avvisi-page/avvisi-step2-stato-caricamenti/avvisi-step2-stato-caricamenti.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TributiStep4ViewComponent } from './pages/tributi-page/tributi-step4-view/tributi-step4-view.component';

const menuEnum = Menu;
const tributiStepEnum = TributiStep;
const avvisiStepEnum = AvvisiStep;

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'secure', redirectTo: '/' + menuEnum.HOME_PATH, pathMatch: 'full' },
  { path: 'login', component: LoginSpidPageComponent, pathMatch: 'full' },
  { path: 'sessionexpired', component: SessionExpiredPageComponent, pathMatch: 'full' },
  { path: menuEnum.AIUTO_PATH, component: AiutoPageComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: menuEnum.GUIDA_PATH, component: GuidaPageComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  {
    path: menuEnum.HOME_PATH,
    component: HomePageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: tributiStepEnum.STEP0,
        component: TributiStep0HomeComponent
      },
      {
        path: avvisiStepEnum.STEP0,
        component: AvvisiStep0HomeComponent
      }
    ]
  },
  {
    path: menuEnum.TRIBUTI_PATH,
    component: TributiPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: tributiStepEnum.STEP1,
        component: TributiStep1ImpostaEntiComponent
      },
      {
        path: tributiStepEnum.STEP2,
        component: TributiStep2DefinisciRateComponent
      },
      {
        path: tributiStepEnum.STEP3,
        component: TributiStep3VerificaDatiComponent
      },
      {
        path: tributiStepEnum.STEP4,
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
        path: avvisiStepEnum.STEP1,
        component: AvvisiStep1CaricaPosizioniComponent
      },
      {
        path: avvisiStepEnum.STEP2,
        component: AvvisiStep2StatoCaricamentiComponent
      }
    ]
  },
  {
    path: menuEnum.IMPOSTAZIONI_PATH,
    component: ImpostazioniPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  { path: '**', component: NotFoundPageComponent }
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
