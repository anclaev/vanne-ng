/**
 * Интерфейс переменных окружения
 */
export interface IEnvironment {
  /**
   * Флаг боевого окружения
   */
  PRODUCTION: boolean

  /**
   * Токен Sentry
   */
  SENTRY_DSN: string | null

  /**
   * Хост API
   */
  API_HOST: string
}
