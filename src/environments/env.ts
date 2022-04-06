import { IEnvironment } from '@common/interfaces'

/**
 * Переменные dev-окружения
 */
export const ENV: IEnvironment = {
  PRODUCTION: false,
  SENTRY_DSN: null,
  API_HOST: 'http://localhost:3000',
}
