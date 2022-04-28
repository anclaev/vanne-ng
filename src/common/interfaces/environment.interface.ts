/**
 * Интерфейс переменных окружения
 */
export interface IEnvironment {
  /**
   * Флаг окружения
   */
  ENV: 'production' | 'development' | 'staging'

  /**
   * Токен Sentry
   */
  SENTRY_DSN: string

  /**
   * Хост API
   */
  API_HOST: string

  /**
   * Хост GraphQL
   */
  GQL_HOST: string
}

export type Environment = IEnvironment
