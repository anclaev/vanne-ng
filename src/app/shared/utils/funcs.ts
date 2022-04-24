/**
 * Функция случайного числа в заданном диапазоне
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @returns {number} Сгенерированное число
 */
export const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min
