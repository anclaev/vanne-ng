/**
 * Регулярное выражения для ошибок, подлежащих игнорированию Sentry
 */
export const sentryIgnoreRegex = new RegExp(
  `401 Unauthorized|404 Not Found|Unauthorized|Not Found`,
  'mi',
)

/** Массив внутренних маршрутов */
export const internalRoutes = [
  '/',
  '/u',
  '/progress',
  '/alarm',
  '/debt',
  '/chat',
  '/settings',
]

/**
 * Массив допустимых типов изображения
 */
export const imageMimeTypes = ['image/png', 'image/jpeg', 'image/webp']

/**
 * Зона компонента (внутренний/внешний)
 */
export type ComponentZone = 'internal' | 'public'

/**
 * Параметры форматирования даты
 */
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD MMMM, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}
