/**
 * Перечисление с ключами storage
 */
export enum STORAGE {
  /**
   * Флаг сокрытия навбара
   */
  NAV_HIDDEN = 'VANNE_NAV_HIDDEN',
}

export type Storage = keyof typeof STORAGE
