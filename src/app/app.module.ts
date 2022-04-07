import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import * as Sentry from '@sentry/angular'
import { Router } from '@angular/router'

import { AppComponent } from './app.component'

import { RoutesModule } from '@core/routes/routes.module'
import { GqlModule } from '@core/gql/gql.module'

import { SharedModule } from '@shared/shared.module'

import { DashboardModule } from './dashboard/dashboard.module'
import { ProgressModule } from './progress/progress.module'
import { SettingsModule } from './settings/settings.module'
import { AlertsModule } from './alerts/alerts.module'
import { ChatsModule } from './chats/chats.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MeModule } from './me/me.module'

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
    RoutesModule,
    AuthModule,
    DashboardModule,
    ProgressModule,
    AlertsModule,
    ChatsModule,
    UsersModule,
    SettingsModule,
    MeModule,
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
