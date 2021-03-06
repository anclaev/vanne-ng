import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router'

import * as Sentry from '@sentry/angular'

import { ENV } from '../environments/env'

import { TeamsService } from '@shared/services/teams.service'
import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'
import { SharedModule } from '@shared/shared.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { GqlModule } from '@core/gql/gql.module'

/**
 * Корневой модуль приложения
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GqlModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: ENV.ENV !== 'development',
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    AuthService,
    ToastService,
    TeamsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
