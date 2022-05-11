import { IUser } from '../interfaces'
import { ISession } from '../interfaces/session.interface'

/**
 * Модель аккаунта на основе пользователя
 */
export interface IAccount extends IUser {
  /**
   * Электронная почта аккаунта
   */
  email: string | null

  /**
   * Мобильный номер аккаунта
   */
  phone: string | null

  /**
   * Дата рождения на аккаунте
   */
  birthday: string | null
}

/**
 * Дефолтные значения аккаунта
 */
export const initialAccount: IAccount = {
  _id: null,
  avatar: null,
  birthday: null,
  email: null,
  login: null,
  phone: null,
  role: null,
  team: null,
  username: null,
}
