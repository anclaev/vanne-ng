import moment from 'moment'

import { ROLE, STORAGE, CodeRole, IntlRole } from '@/common/enums'

/**
 * Функция случайного числа в заданном диапазоне
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @returns {number} Сгенерированное число
 */
export const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Функция форматирования даты ISO в человеческий
 * @example
 * formatDateFromISO('2001-10-12T10:25:23.000+00:00')
 * 12 октября 2001 г.
 * @param {string} date ISO timestamp
 * @param {boolean} short Флаг на словесный/числовой месяц
 * @returns {string} Отформатированная дата
 */
export const formatDateFromISO = (
  date: string,
  short: boolean = true,
): string =>
  short ? moment(date).format('L') : moment(date).locale('ru').format('LL')

/**
 * Метод локализации роли
 * @param {ROLE} role Системная роль пользователя
 * @returns {string} Русифицированная роль
 */
export const translateRole = (role: ROLE | string): string => {
  return IntlRole[role as ROLE]
}

/**
 * Метод кодирования роли
 * @param {string} role Переведённая роль пользователя
 * @returns {string} Русифицированная роль
 */
export const codingRole = (role: ROLE | string): string => {
  return CodeRole[role as keyof typeof CodeRole]
}

/**
 * Массив ролей
 */
export const intlRoles = () => {
  let roles: string[] = []

  for (let role in IntlRole) {
    roles.push(IntlRole[role as keyof typeof IntlRole])
  }

  return roles
}

/**
 * Массив кодов ролей
 */
export const codeRoles = () => {
  let role_codes: string[] = []

  for (let role in CodeRole) {
    role_codes.push(CodeRole[role as keyof typeof CodeRole])
  }

  return role_codes
}
