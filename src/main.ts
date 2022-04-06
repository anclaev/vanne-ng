import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { BrowserTracing } from '@sentry/tracing'
import { enableProdMode } from '@angular/core'

import * as Sentry from '@sentry/angular'

import { AppModule } from './app/app.module'

import { ENV } from '@env/env'

Sentry.init({
  dsn: 'https://5fd83b96db474fa6bd96795b8bbefe9f@o1139050.ingest.sentry.io/6313915',
  environment: ENV.PRODUCTION ? 'production' : 'development',
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
