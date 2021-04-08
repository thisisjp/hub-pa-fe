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
import { TributiStep0Component } from './pages/home-page/tributi-step0/tributi-step0.component';
import { TributiStep2Component } from './pages/tributi-page/tributi-step2/tributi-step2.component';
import { TributiStep1Component } from './pages/tributi-page/tributi-step1/tributi-step1.component';
import { TributiStep3Component } from './pages/tributi-page/tributi-step3/tributi-step3.component';
import { TributiStep } from './models/tributi-step';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AvvisiStep } from './models/avvisi-step';
import { AvvisiStep0Component } from './pages/home-page/avvisi-step0/avvisi-step0.component';
import { AvvisiStep1Component } from './pages/avvisi-page/avvisi-step1/avvisi-step1.component';
import { AvvisiStep2Component } from './pages/avvisi-page/avvisi-step2/avvisi-step2.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

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
        component: TributiStep0Component
      },
      {
        path: avvisiStepEnum.STEP0,
        component: AvvisiStep0Component
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
        component: TributiStep1Component
      },
      {
        path: tributiStepEnum.STEP2,
        component: TributiStep2Component
      },
      {
        path: tributiStepEnum.STEP3,
        component: TributiStep3Component
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
        component: AvvisiStep1Component
      },
      {
        path: avvisiStepEnum.STEP2,
        component: AvvisiStep2Component
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
