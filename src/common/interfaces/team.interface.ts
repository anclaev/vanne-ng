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

  /**
   * Короткое название компании
   */
  short_name: string

  /**
   * Статус действия компании
   */
  activated: boolean
}

export type Team = ITeam
