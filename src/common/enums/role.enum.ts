import { IntlRole } from '..'

/**
 * Перечисление с ролями пользователя
 */
export enum ROLE {
  /**
   * Студент организации
   */
  STUDENT = 'STUDENT',

  /**
   * Преподаватель дисциплины
   */
  TEACHER = 'TEACHER',

  /**
   * Куратор группы
   */
  SUPERVISOR = 'SUPERVISOR',

  /**
   * Куратор организации
   */
  HEAD = 'HEAD',

  /**
   * Администратор ИС
   */
  ADMIN = 'ADMIN',
}

export type Role = keyof typeof ROLE

export type TRole = {
  [Property in keyof typeof ROLE]: string
}
