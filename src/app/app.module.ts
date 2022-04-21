import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router'
import * as Sentry from '@sentry/angular'

import { ENV } from '../environments/env'

import { AppComponent } from './app.component'

import { GqlModule } from '@core/gql/gql.module'

import { SharedModule } from '@shared/shared.module'

import { AppRoutingModule } from './app-routing.module'

import { DashboardModule } from './dashboard/dashboard.module'
import { ProgressModule } from './progress/progress.module'
import { SettingsModule } from './settings/settings.module'
import { AlarmsModule } from './alarms/alarms.module'
import { DebtsModule } from './debts/debts.module'
import { ChatsModule } from './chats/chats.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

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
    AuthModule,
    DashboardModule,
    ProgressModule,
    DebtsModule,
    AlarmsModule,
    ChatsModule,
    SettingsModule,
    UsersModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: ENV.PRODUCTION,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
