import { Route } from '@angular/router'

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

/**
 * Интерфейс маршрута
 */
interface IRoute extends Route {
  /**
   * Поле передаваемых данных
   */
  data: {
    /**
     * Заголовок страницы
     */
    title: string
  }
}

export type Routes = IRoute[]
