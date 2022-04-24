/**
 * Данных компании пользователя
 */
export interface ITeam {
  /**
   * ID компании
   */
  _id: string

  /**
   * Наименование компании
   */
  name: string
}

export type Team = ITeam
