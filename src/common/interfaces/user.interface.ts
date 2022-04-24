import { ROLE } from '../enums'
import { ITeam } from './team.interface'

/**
 * Интерфейс данных пользователя
 */
export interface IUser {
  /**
   * ID аккаунта
   */
  _id: string

  /**
   * Логин аккаунта
   */
  login: string

  /**
   * Имя пользователя
   */
  username: string | null

  /**
   * Роль аккаунта
   */
  role: ROLE

  /**
   * Компания аккаунта
   */
  team: ITeam

  /**
   * Аватар аккаунта
   */
  avatar: string
}

export type User = IUser | null
