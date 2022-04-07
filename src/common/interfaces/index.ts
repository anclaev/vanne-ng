import { Route, Event } from '@angular/router'

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
 * Интерфейс данных внутри маршрута
 */
export interface IRouteData {
  /**
   * Заголовок страницы
   */
  title: string
}

/**
 * Интерфейс маршрута
 */
interface IRoute extends Route {
  data: IRouteData
}

export type Routes = IRoute[]
export type ComponentType = 'internal' | 'public'
