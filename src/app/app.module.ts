import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/common/button/button.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { InputComponent } from './components/common/input/input.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { MessageComponent } from './components/common/message/message.component';
import { AvvisiPageComponent } from './pages/avvisi-page/avvisi-page.component';
import { TributiPageComponent } from './pages/tributi-page/tributi-page.component';
import { GuidaPageComponent } from './pages/guida-page/guida-page.component';
import { ImpostazioniPageComponent } from './pages/impostazioni-page/impostazioni-page.component';
import { LoginSpidPageComponent } from './pages/login-spid-page/login-spid-page.component';
import { SessionExpiredPageComponent } from './pages/session-expired-page/session-expired-page.component';
import { AiutoPageComponent } from './pages/aiuto-page/aiuto-page.component';
import { SecurityInterceptorService } from './services/security-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TributiStep0HomeComponent } from './pages/home-page/tributi-step0-home/tributi-step0-home.component';
import { TributiStep1ImpostaEntiComponent } from './pages/tributi-page/tributi-step1-imposta-enti/tributi-step1-imposta-enti.component';
import { TributiStep2DefinisciRateComponent } from './pages/tributi-page/tributi-step2-definisci-rate/tributi-step2-definisci-rate.component';
import { TributiStep3VerificaDatiComponent } from './pages/tributi-page/tributi-step3-verifica-dati/tributi-step3-verifica-dati.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AvvisiStep0HomeComponent } from './pages/home-page/avvisi-step0-home/avvisi-step0-home.component';
import { AvvisiStep1CaricaPosizioniComponent } from './pages/avvisi-page/avvisi-step1-carica-posizioni/avvisi-step1-carica-posizioni.component';
import { AvvisiStep2StatoCaricamentiComponent } from './pages/avvisi-page/avvisi-step2-stato-caricamenti/avvisi-step2-stato-caricamenti.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TributiStep4ViewComponent } from './pages/tributi-page/tributi-step4-view/tributi-step4-view.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    FooterComponent,
    HeaderComponent,
    InputComponent,
    LoaderComponent,
    MessageComponent,
    AvvisiPageComponent,
    TributiPageComponent,
    GuidaPageComponent,
    ImpostazioniPageComponent,
    LoginSpidPageComponent,
    SessionExpiredPageComponent,
    AiutoPageComponent,
    TributiStep0HomeComponent,
    TributiStep1ImpostaEntiComponent,
    TributiStep2DefinisciRateComponent,
    TributiStep3VerificaDatiComponent,
    HomePageComponent,
    AvvisiStep0HomeComponent,
    AvvisiStep1CaricaPosizioniComponent,
    AvvisiStep2StatoCaricamentiComponent,
    NotFoundPageComponent,
    TributiStep4ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxLocalStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          silent: true
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptorService,
      multi: true
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
