/**
 * Авторизационные данные пользователя
 */
export interface ICredentials {
  /**
   * Логин пользователя
   */
  login: string

  /**
   * Пароль пользователя
   */
  password: string
}

export type Credentials = ICredentials
