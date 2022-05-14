import { TRole } from './enums/role.enum'

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
 * Зона компонента (внутренний/внешний)
 */
export type ComponentZone = 'internal' | 'public'
