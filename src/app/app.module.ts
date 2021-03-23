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
import { LogoutComponent } from './components/menu/logout/logout.component';
import { SidebarMenuComponent } from './components/menu/sidebar-menu/sidebar-menu.component';
import { CaricamentoAvvisiPagamentoPageComponent } from './pages/caricamento-avvisi-pagamento-page/caricamento-avvisi-pagamento-page.component';
import { CommonTemplatePageComponent } from './pages/common-template-page/common-template-page.component';
import { ConfigurazioneTributoPageComponent } from './pages/configurazione-tributo-page/configurazione-tributo-page.component';
import { DocumentazioneUtilizzoPortalePageComponent } from './pages/documentazione-utilizzo-portale-page/documentazione-utilizzo-portale-page.component';
import { GestioneAvvisiPagamentoPageComponent } from './pages/gestione-avvisi-pagamento-page/gestione-avvisi-pagamento-page.component';
import { LoginSpidPageComponent } from './pages/login-spid-page/login-spid-page.component';
import { SessionExpiredPageComponent } from './pages/session-expired-page/session-expired-page.component';
import { SupportPageComponent } from './pages/support-page/support-page.component';
import { SecurityInterceptorService } from './services/security-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';

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
    LogoutComponent,
    SidebarMenuComponent,
    CaricamentoAvvisiPagamentoPageComponent,
    CommonTemplatePageComponent,
    ConfigurazioneTributoPageComponent,
    DocumentazioneUtilizzoPortalePageComponent,
    GestioneAvvisiPagamentoPageComponent,
    LoginSpidPageComponent,
    SessionExpiredPageComponent,
    SupportPageComponent
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
