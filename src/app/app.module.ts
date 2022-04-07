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
import { AuthModule } from './auth/auth.module'
import { DashboardModule } from './dashboard/dashboard.module'

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
