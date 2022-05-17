import { Injectable } from '@angular/core'

import { STORAGE } from '@/common/enums'

/**
 * Сервис взаимодействия со storage
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Метод добавления значения в session storage
   * @param {STORAGE} key Ключ значения
   * @param {string} value Значение
   */
  public setSessionStorage(key: STORAGE, value: string) {
    sessionStorage.setItem(key, value)
  }

  /**
   * Метод добавления значения в local storage
   * @param {STORAGE} key Ключ значения
   * @param {string} value Значение
   */
  public setLocalStorage(key: STORAGE, value: string) {
    localStorage.setItem(key, value)
  }

  /**
   * Метод получения значения из session storage
   * @param {STORAGE} key Ключ значения
   * @return {string} Значение из storage
   */
  public getSessionStorage(key: STORAGE): string | null {
    return sessionStorage.getItem(key)
  }

  /**
   * Метод получения значения из local storage
   * @param {STORAGE} key Ключ значения
   * @return {string} Значение из storage
   */
  public getLocalStorage(key: STORAGE): string | null {
    return localStorage.getItem(key)
  }

  /**
   * Метод удаления значения из session storage
   * @param {STORAGE} key Ключ значения
   */
  public removeSessionStorage(key: STORAGE) {
    sessionStorage.removeItem(key)
  }

  /**
   * Метод удаления значения из local storage
   * @param {STORAGE} key Ключ значения
   */
  public removeLocalStorage(key: STORAGE) {
    localStorage.removeItem(key)
  }

  /**
   * Метод очистки session storage
   */
  public clearSessionStorage() {
    sessionStorage.clear()
  }

  /**
   * Метод очистки local storage
   */
  public clearLocalStorage() {
    localStorage.clear()
  }
}
