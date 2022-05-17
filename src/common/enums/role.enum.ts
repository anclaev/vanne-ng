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

/**
 * Локализированные роли пользователей
 */
export const IntlRole: TRole = {
  ADMIN: 'Администратор',
  HEAD: 'Руководитель',
  STUDENT: 'Студент',
  SUPERVISOR: 'Куратор',
  TEACHER: 'Преподаватель',
}

/**
 * Коды ролей
 */
export const CodeRole = {
  Администратор: 'ADMIN',
  Руководитель: 'HEAD',
  Студент: 'STUDENT',
  Куратор: 'SUPERVISOR',
  Преподаватель: 'TEACHER',
}
