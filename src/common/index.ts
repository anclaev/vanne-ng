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
  '/progress',
  '/alerts',
  '/chats',
  '/users',
  '/me',
  '/settings',
]
