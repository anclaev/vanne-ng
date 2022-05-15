import { ROLE } from '../enums'
import { ITeam } from './team.interface'

/**
 * Интерфейс данных пользователя
 */
export interface IUser {
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
  username: string | null

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
}

export type User = IUser | null

export const testingUser: User = {
  _id: '1',
  avatar: 'test',
  login: 'test',
  username: 'test',
  role: ROLE.ADMIN,
  team: {
    _id: '1',
    name: 'test',
  },
}
