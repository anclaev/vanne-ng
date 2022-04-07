import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { BrowserTracing } from '@sentry/tracing'
import { enableProdMode } from '@angular/core'
import * as Sentry from '@sentry/angular'

import { AppModule } from './app/app.module'

import { sentryIgnoreRegex } from '@/common'

import { ENV } from '@env/env'

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  environment: ENV.PRODUCTION ? 'production' : 'development',
  ignoreErrors: [sentryIgnoreRegex],
  tracesSampleRate: 1.0,
  integrations: [
    new BrowserTracing({
      tracingOrigins: [ENV.API_HOST],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
})

if (ENV.PRODUCTION) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
