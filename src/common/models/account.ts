import { ITeam } from '../interfaces'
import { ROLE } from '../enums'

/**
 * Модель аккаунта на основе пользователя
 */
export interface Account {
  /**
   * ID аккаунта
   */
  _id: string | null

  /**
   * Логин аккаунта
   */
  login: string | null

  /**
   * Имя пользователя
   */
  firstname: string | null

  /**
   * Фамилия пользователя
   */
  surname: string | null

  /**
   * Роль аккаунта
   */
  role: ROLE | null

  /**
   * Компания аккаунта
   */
  team: ITeam | null

  /**
   * Аватар аккаунта
   */
  avatar: string | null

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
