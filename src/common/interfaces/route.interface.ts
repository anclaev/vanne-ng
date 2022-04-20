import { Route } from '@angular/router'

/**
 * Интерфейс данных внутри маршрута
 */
export interface IRouteData {
  /**
   * Заголовок страницы
   */
  title: string

  /**
   * Анимация маршрута
   */
  animation?: string
}

/**
 * Интерфейс маршрута
 */
export interface IRoute extends Route {
  /**
   * Данные внутри маршрута
   */
  data: IRouteData
}

export type Routes = IRoute[]
