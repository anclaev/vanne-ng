/**
 * Интерфейс сессии пользователя
 */
export interface ISession {
  /**
   * Отпечаток устройства пользователя
   */
  fingerprint: string

  /**
   * Токен обновления
   */
  refreshToken: string

  /**
   * Дата сгорания сессии
   */
  expiration: Date

  /**
   * Браузер сессии
   */
  browser: string

  /**
   * Девайс сессии
   * */
  device: string

  /**
   * Операционная система сессии
   */
  os: string
}
