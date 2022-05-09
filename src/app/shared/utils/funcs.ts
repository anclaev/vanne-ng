import moment from 'moment'

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
